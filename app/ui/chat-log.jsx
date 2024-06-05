"use client";

import { useEffect, useRef } from "react";
import Message from "@/app/ui/message";

export default function ChatLog({ messages, room }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex min-h-72 flex-grow flex-col rounded-lg">
      <div className="rounded-t-lg bg-slate-700 pb-2 pl-5 pr-5 pt-2 text-slate-100">
        <h2 className="text-lg">{room}</h2>
      </div>
      <div className="flex-grow overflow-scroll rounded-b-lg bg-slate-600 p-5 text-slate-100">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
