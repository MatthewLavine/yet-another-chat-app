"use client";

import { useEffect, useRef } from "react";
import Message from "@/app/ui/message";

export default function ChatLog({ messages, room }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex min-h-64 flex-shrink flex-grow flex-col overflow-hidden">
      <div className="bg-slate-200 p-5 pb-2 pl-5 pr-5 pt-5 dark:bg-slate-800 dark:text-white">
        <h2 className="text-lg font-bold">{room}</h2>
      </div>
      <div className="flex-grow overflow-y-auto bg-slate-200 p-5 dark:bg-slate-800 dark:text-white">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
