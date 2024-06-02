import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { createClient } from "redis";
import { randomUUID } from "crypto";

const PORT = 4000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
app.use(cors());
const redisClient = createClient({
  socket: {
    host: "database",
    port: 6379,
  },
});

redisClient.on("connect", async () => {
  console.log("Connected to Redis");
  const messages = await redisClient.json.get("messages", "$", []);
  if (!messages) {
    await redisClient.json.set("messages", "$", []);
  }
});

redisClient.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

process.on("SIGINT", () => {
  redisClient.quit();
  process.exit();
});

let rooms = [{ name: "#general" }];
let users = [];

io.on("connection", async (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  console.log(`total connections: ${io.engine.clientsCount}`);

  let user;

  socket.on("disconnect", () => {
    console.log(`🔥: ${socket.id} user disconnected`);
    console.log(`total connections: ${io.engine.clientsCount}`);
    users = users.filter((u) => u.id !== socket.id);
    console.log("🚪: users: %o", users);
    io.emit("chat message", {
      id: randomUUID(),
      time: new Date().toISOString().split("T")[1],
      sender: "SYSTEM",
      content: `🔥: ${user} left the chat`,
    });
    io.emit("users", users);
  });

  socket.on("join", async (username) => {
    console.log("🚪: user joined: %s", username);
    user = username;
    users.push({ id: socket.id, name: user });
    console.log("🚪: users: %o", users);

    await redisClient.json.get("messages", "$").then((messages) => {
      if (messages.length === 0) {
        return;
      }
      console.log("📨: sending history to user: %s", user);
      for (const message of messages) {
        socket.emit("chat message", message);
      }
    });

    io.emit("chat message", {
      id: randomUUID(),
      time: new Date().toISOString().split("T")[1],
      sender: "SYSTEM",
      content: `🚪: ${user} joined the chat`,
    });
    io.emit("users", users);
    socket.emit("rooms", rooms);
  });

  socket.on("chat message", async (msg) => {
    console.log("📨: broadcasting message: %o", msg);
    msg.id = randomUUID();
    await redisClient.json.arrAppend("messages", "$", msg);
    io.emit("chat message", msg);
  });

  socket.on("clear history", async () => {
    console.log("🗑: clearing history");
    await redisClient.json.set("messages", "$", []);
    io.emit("clear history");
  });
});

app.get("/", (req, res) => {
  res.send("Backend Online");
});

redisClient.connect();

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
