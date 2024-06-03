import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { createClient } from "redis";
import { randomUUID } from "crypto";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const redisClient = createClient({
  socket: {
    host: "database",
    port: 6379,
  },
});

app.use(cors());
app.use(morgan("common"));

let rooms = [
  { name: "general", deleteWhenEmpty: false },
  { name: "random", deleteWhenEmpty: false },
  { name: "programming", deleteWhenEmpty: false },
];

async function initRoom(room) {
  if (!rooms.find((r) => r.name === room)) {
    rooms.push({ name: room, deleteWhenEmpty: true });
  }
  console.log("🚪: initializing room %s", room);
  const messages = await redisClient.json.get(room, "$", []);
  if (!messages) {
    await redisClient.json.set(room, "$", []);
  }
}

async function maybeDeleteRoom(room) {
  if (rooms.find((r) => r.deleteWhenEmpty && r.name === room)) {
    await redisClient.json.del(room);
    users.delete(room);
    rooms = rooms.filter((r) => r.name !== room);
    console.log("🚪: deleted room %s", room);
  }
}

redisClient.on("connect", async () => {
  console.log("Connected to Redis");
  console.log(
    "Initializing rooms: ",
    rooms.map((room) => room.name),
  );
  for (const room of rooms) {
    await initRoom(room.name);
  }
});

redisClient.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

process.on("SIGINT", () => {
  redisClient.quit();
  process.exit();
});
let users = new Map();

for (const room of rooms) {
  users.set(room.name, []);
}

function logUsersInRoom(room) {
  console.log(
    "🚪: %d users in room %s: %o",
    users.get(room).length,
    room,
    users.get(room).map((user) => user.name),
  );
}

async function addUserToRoom(room, user) {
  const roomUsers = users.get(room);
  if (roomUsers === undefined) {
    // Make a new room.
    console.log("🚪: creating new room %s", room);
    await initRoom(room);
    users.set(room, [user]);
    return;
  }
  roomUsers.push(user);
}

function removeUserFromRoom(room, id) {
  users.set(
    room,
    users.get(room).filter((user) => user.id !== id),
  );
}

function renameUserInRoom(room, id, newName) {
  users.set(
    room,
    users.get(room).map((user) => {
      if (user.id === id) {
        user.name = newName;
      }
      return user;
    }),
  );
}

io.on("connection", async (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  console.log(`total connections: ${io.engine.clientsCount}`);

  let user;
  let room;

  socket.on("disconnect", async () => {
    console.log(`🔥: ${socket.id} user disconnected`);
    console.log(`total connections: ${io.engine.clientsCount}`);
    removeUserFromRoom(room, socket.id);
    logUsersInRoom(room);
    io.to(room).emit("chat message", {
      id: randomUUID(),
      time: new Date().toISOString().split("T")[1],
      sender: "SYSTEM",
      content: `🔥: ${user} left the room`,
    });
    io.to(room).emit("users", users.get(room));
    if (users.get(room).length === 0) {
      await maybeDeleteRoom(room);
    }
  });

  socket.on("namechange", async (newName) => {
    console.log("🔖: user changed name: %s", newName);
    const oldName = user;
    user = newName;
    io.to(room).emit("chat message", {
      id: randomUUID(),
      time: new Date().toISOString().split("T")[1],
      sender: "SYSTEM",
      content: `🔖: ${oldName} changed their name to ${newName}`,
    });
    renameUserInRoom(room, socket.id, newName);
    logUsersInRoom(room);
    io.to(room).emit("users", users.get(room));
  });

  socket.on("join", async (joinrequest) => {
    const newUsername = joinrequest.username;
    const newRoom = joinrequest.room;
    user = newUsername;
    room = newRoom;

    socket.join(room);
    console.log("🚪: user joined room %s: %s", room, user);
    await addUserToRoom(room, { id: socket.id, name: user });
    logUsersInRoom(room);

    await redisClient.json.get(room, "$").then((messages) => {
      if (messages.length === 0) {
        return;
      }
      console.log("📨: sending history to user: %s", user);
      for (const message of messages) {
        socket.emit("chat message", message);
      }
    });

    io.to(room).emit("chat message", {
      id: randomUUID(),
      time: new Date().toISOString().split("T")[1],
      sender: "SYSTEM",
      content: `🚪: ${user} joined the room`,
    });
    io.to(room).emit("users", users.get(room));
    io.emit("rooms", rooms);
  });

  socket.on("chat message", async (msg) => {
    console.log("📨: broadcasting message: %o", msg);
    msg.id = randomUUID();
    await redisClient.json.arrAppend(room, "$", msg);
    io.to(room).emit("chat message", msg);
  });

  socket.on("clear history", async () => {
    console.log("🗑: clearing history for room %s", room);
    await redisClient.json.set(room, "$", []);
    io.to(room).emit("clear history");
  });
});

app.get("/", (req, res) => {
  res.send("Backend Online");
});

app.get("/api/rooms", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  res.json(rooms.map((room) => room.name));
});

redisClient.connect();

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
