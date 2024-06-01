"use client";

import { useState, useEffect } from "react";
import ChatLog from "@/app/ui/chat-log";
import InputForm from "@/app/ui/input-form";
import RoomList from "@/app/ui/room-list";
import ConnectedIndicator from "@/app/ui/connected-indicator";

import io from "socket.io-client";

const socket = io("http://localhost:4000", {
  autoConnect: false,
});

export default function Home() {
  const randomUsername = () => {
    return `user-${(Math.random() + 1).toString(36).substring(7)}`;
  };

  const [username, setUsername] = useState(randomUsername());
  const [messages, setMessages] = useState<any>([]);
  const [connected, setConnected] = useState(false);

  function connectSocket() {
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

      socket.emit("join", username);
    });

    socket.on("disconnect", () => {
      console.log("disconnected socket");

      addMessage(
        new Date().toISOString().split("T")[1],
        "SYSTEM",
        `🔥: ${username} left the chat`,
      );
    });

    socket.on("chat message", (msg: any) => {
      console.log("received message: %o", msg);
      addMessage(msg.time, msg.sender, msg.content);
    });

    socket.on("clear history", () => {
      setMessages([]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat message");
      socket.off("clear history");
    };
  });

  function addMessage(time: string, sender: string, message: string) {
    setMessages((messages: any) => [
      ...messages,
      {
        time: time,
        sender: sender,
        content: message,
      },
    ]);
  }

  return (
    <main>
      <ConnectedIndicator
        connected={connected}
        connectFunc={connectSocket}
        disconnectFunc={disconnectSocket}
      />
      <div className="flex h-screen flex-col items-center justify-between p-24">
        <div className="flex w-full max-w-5xl flex-grow flex-col items-center justify-between gap-5 overflow-hidden font-mono text-sm">
          <h1 className="text-3xl font-medium">Yet Another Chat App</h1>
          <div className="flex min-h-72 w-full flex-grow flex-row">
            <RoomList />
            <ChatLog
              socket={socket}
              connected={connected}
              messages={messages}
            />
          </div>
          <InputForm
            socket={socket}
            addMessage={addMessage}
            username={username}
            setUsername={setUsername}
          />
        </div>
      </div>
    </main>
  );
}
