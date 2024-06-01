"use client";

import { useRef } from "react";

export default function InputForm({
  socket,
  addMessage,
  username,
  setUsername,
}) {
  const inputRef = useRef(null);

  const sendMessage = (sender, message) => {
    if (sender === "" || message === "") {
      return;
    }
    console.log("sending message: %s", message);
    socket.emit("chat message", {
      time: new Date().toISOString().split("T")[1],
      sender: sender,
      content: message,
    });
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const clearHistory = () => {
    return () => {
      socket.emit("clear history");
    };
  };

  return (
    <form
      action={async (formData) => {
        sendMessage(formData.get("username"), formData.get("message"));
      }}
      className="flex w-full flex-row gap-5"
    >
      <input
        name="username"
        type="text"
        placeholder="Username"
        autoComplete="off"
        defaultValue={username}
        className="rounded-lg border border-blue-500 p-2"
      />
      <input
        name="message"
        type="text"
        ref={inputRef}
        placeholder="Type a message..."
        autoFocus
        autoComplete="off"
        className="grow rounded-lg border border-blue-500 p-2"
      />
      <button
        type="submit"
        className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      >
        Send
      </button>
      <button
        type="button"
        onClick={clearHistory()}
        className="flex h-10 items-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-red-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      >
        Clear History
      </button>
    </form>
  );
}
