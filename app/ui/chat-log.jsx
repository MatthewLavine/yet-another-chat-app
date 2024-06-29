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

  let messagesInDay = [];
  let lastMessageDay = null;

  messages.forEach((message) => {
    const date = new Date(message.time);
    const messageDay = date.getDay();
    if (lastMessageDay === null) {
      messagesInDay.push({ type: "day", day: date.toDateString() });
    }
    if (messageDay !== lastMessageDay) {
      if (messagesInDay.length > 0) {
        messagesInDay.push({ type: "day", day: lastMessageDay });
      }
      lastMessageDay = messageDay;
    }
    messagesInDay.push({ type: "message", message });
  });

  const output = messagesInDay.map((item, index) => {
    if (item.type === "day") {
      return (
        <div
          key={index}
          className="text-center text-xs text-stone-600 dark:text-stone-400"
        >
          {item.day}
        </div>
      );
    } else {
      return <Message key={index} message={item.message} />;
    }
  });

  return (
    <div className="flex min-h-64 flex-shrink flex-grow flex-col overflow-hidden">
      <div className="bg-slate-200 p-5 pb-2 pl-5 pr-5 pt-5 dark:bg-slate-800 dark:text-white">
        <h2 className="text-lg font-bold">{room}</h2>
      </div>
      <div className="flex-grow overflow-y-auto bg-slate-200 p-5 dark:bg-slate-800 dark:text-white">
        {output}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
