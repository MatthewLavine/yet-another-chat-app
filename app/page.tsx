'use client';

import { useState, useEffect } from 'react';
import ChatLog from "@/app/ui/chat-log";
import InputForm from "@/app/ui/input-form";
import ConnectedIndicator from "@/app/ui/connected-indicator";

import io from 'socket.io-client'

const initialMessages =
  [
    {
      time: "00:00:00.000Z",
      sender: "foo",
      content: "bar",
    },
    {
      time: "00:00:01.000Z",
      sender: "fizz",
      content: "buzz",
    },
    {
      time: "00:00:02.000Z",
      sender: "Bob",
      content: "Needs more AI",
    },
  ];

const socket = io('http://localhost:4000', {
  autoConnect: false,
});

export default function Home() {

  const [messages, setMessages] = useState<any>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (connected) {
      console.log('already connected!');
      return;
    }

    console.log('connecting socket');
    socket.connect();
    setConnected(true);

    return () => {
      socket.disconnect();
      setConnected(false);
    }
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected socket');
    });

    socket.on('disconnect', () => {
      console.log('disconnected socket');
    });

    socket.on('chat message', (msg: any) => {
      console.log('received message: %o', msg);
      addMessage(msg.sender, msg.content);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat message');
    }
  });

  function addMessage(sender: string, message: string) {
    setMessages([...messages, {
      time: new Date().toISOString().split('T')[1],
      sender: sender,
      content: message,
    }]);
  }

  return (
    <main>
      <ConnectedIndicator connected={connected} />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex-col flex-grow gap-5 z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-3xl font-medium">Yet Another Chat App</h1>
          <ChatLog socket={socket} connected={connected} messages={messages} />
          <InputForm socket={socket} addMessage={addMessage} />
        </div>
      </div>
    </main>
  );
}
