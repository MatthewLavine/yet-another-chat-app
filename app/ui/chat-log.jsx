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
    <div className="flex min-h-72 flex-grow flex-col overflow-scroll rounded-lg">
      <div className="rounded-t-lg bg-slate-700 pb-2 pl-5 pr-5 pt-2 text-slate-100">
        <h2 className="text-lg">#general</h2>
      </div>
      <div className="flex-grow rounded-b-lg bg-slate-600 p-5 text-slate-100">
        {messages.map((message, index) => (
          <div key={index}>
            <span className="sender">[{message.time}]&nbsp;</span>
            <span className="sender">&lt;{message.sender}&gt;&nbsp;</span>
            <span className="content">{message.content}</span>
            <div ref={messagesEndRef} />
          </div>
        ))}
      </div>
    </div>
  );
}
