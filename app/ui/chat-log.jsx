"use client";

import { useEffect, useRef } from "react";

export default function ChatLog({ socket, connected, messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-72 flex-grow overflow-scroll rounded-lg bg-slate-600 p-5 text-slate-100">
      <h2 className="text-lg">#general</h2>
      {messages.map((message, index) => (
        <div key={index}>
          <span className="sender">[{message.time}]&nbsp;</span>
          <span className="sender">&lt;{message.sender}&gt;&nbsp;</span>
          <span className="content">{message.content}</span>
          <div ref={messagesEndRef} />
        </div>
      ))}
    </div>
  );
}
