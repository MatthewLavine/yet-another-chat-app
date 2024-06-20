"use client";

import { lazy, useState, useEffect, Suspense } from "react";
// import ChatLog from "@/app/ui/chat-log";
import InputForm from "@/app/ui/input-form";
import RoomList from "@/app/ui/room-list";
import UserList from "@/app/ui/user-list";
import ConnectedIndicator from "@/app/ui/connected-indicator";
import ChatLogSkeleton from "@/app/ui/chat-log-skeleton";

import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const socket = io(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`, {
  autoConnect: false,
});

const ChatLog = lazy(() => import("@/app/ui/chat-log"));

export default function Chat({ room }: { room: string }) {
  const randomUsername = () => {
    return `user-${(Math.random() + 1).toString(36).substring(7)}`;
  };

  const [username, setUsername] = useState(randomUsername());
  const [rooms, setRooms] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);
  const [connected, setConnected] = useState(false);

  function updateUsername(newUsername: string) {
    setUsername(newUsername);
    socket.emit("namechange", newUsername);
  }

  function connectSocket() {
    console.log(
      "connecting to socket at %s",
      process.env.NEXT_PUBLIC_API_ENDPOINT,
    );
    socket.connect();
    setConnected(true);
  }

  function disconnectSocket() {
    socket.disconnect();
    setConnected(false);
  }

  useEffect(() => {
    console.log("connecting socket");
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected socket");

      socket.emit("join", { room: room, username: username });
    });

    socket.on("disconnect", () => {
      console.log("disconnected socket");

      addMessage(
        uuidv4(),
        new Date().toISOString().split("T")[1],
        "SYSTEM",
        `🔥: ${username} left the chat`,
      );

      setUsers([]);
      setRooms([]);
    });

    socket.on("chat message", (msg: any) => {
      console.log("received message: %o", msg);
      addMessage(msg.id, msg.time, msg.sender, msg.content);
    });

    socket.on("rooms", (rooms: any) => {
      console.log("received rooms: %o", rooms);
      setRooms(rooms);
    });

    socket.on("users", (users: any) => {
      console.log("received users: %o", users);
      setUsers(users);
    });

    socket.on("clear history", () => {
      setMessages([]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat message");
      socket.off("clear history");
      socket.off("rooms");
      socket.off("users");
    };
  });

  function addMessage(
    id: string,
    time: string,
    sender: string,
    message: string,
  ) {
    const newMessage = {
      id: id,
      time: time,
      sender: sender,
      content: message,
    };
    setMessages((existingMessages: any) => {
      if (
        existingMessages.filter((m: any) => m.id === newMessage.id).length > 0
      ) {
        console.log("omitting existing message: %o", newMessage);
        return existingMessages;
      }
      return [...existingMessages, newMessage];
    });
  }

  return (
    <>
      <div className="flex h-screen flex-row">
        <RoomList rooms={rooms} connected={connected} currentRoom={room} />
        <div className="flex flex-grow flex-col">
          <div className="flex min-h-72 w-full flex-grow flex-row">
            {/* <ConnectedIndicator
              connected={connected}
              connectFunc={connectSocket}
              disconnectFunc={disconnectSocket}
            /> */}
            <div className="flex h-screen flex-grow flex-col">
              {/* <Suspense fallback={<ChatLogSkeleton room={room} />}> */}
              <ChatLog messages={messages} room={room} />
              {/* </Suspense> */}
              <InputForm
                socket={socket}
                username={username}
                updateUsername={updateUsername}
              />
            </div>
            <UserList users={users} connected={connected} />
          </div>
        </div>
      </div>
    </>
  );
}
