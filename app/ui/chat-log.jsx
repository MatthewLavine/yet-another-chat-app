"use client";

import { useEffect, useRef, useState } from "react";
import Message from "@/app/ui/message";
import DateSeparator from "@/app/ui/date-separator";
import { InitOrFetchJoinPartPreference } from "@/app/util";

export default function ChatLog({ messages, room }) {
  const [hideJoinPart, setHideJoinPart] = useState(
    InitOrFetchJoinPartPreference(),
  );
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  messages = messages.filter((message) => {
    if (message.type === "join" || message.type === "part") {
      return !hideJoinPart;
    }
    return true;
  });

  let messagesWithDaySeparators = [];
  let previousMessageDate = null;

  messages.forEach((message) => {
    const date = new Date(message.time);
    const messageDate = date.toDateString();
    if (messageDate !== previousMessageDate) {
      messagesWithDaySeparators.push({
        type: "day",
        day: messageDate,
      });
    }
    previousMessageDate = messageDate;
    messagesWithDaySeparators.push({ type: "message", message });
  });

  let output;

  if (messagesWithDaySeparators.length === 0) {
    // output = <div className="p-2">Loading...</div>;
  } else {
    output = messagesWithDaySeparators.map((item, index) => {
      if (item.type === "day") {
        return <DateSeparator key={index} date={item.day} />;
      } else {
        return <Message key={index} message={item.message} />;
      }
    });
  }

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
