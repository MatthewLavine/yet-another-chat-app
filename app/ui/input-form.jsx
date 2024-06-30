"use client";

import { useRef } from "react";

export default function InputForm({ socket, username }) {
  const inputRef = useRef(null);

  const sendMessage = (sender, message) => {
    if (sender === "" || message === "") {
      inputRef.current.focus();
      return;
    }
    console.log("sending message: %s", message);
    socket.emit("chat message", {
      time: new Date().toJSON(),
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
    <>
      <div className="bg-slate-200">
        <form
          action={async (formData) => {
            sendMessage(username, formData.get("message"));
          }}
          className="flex flex-row"
        >
          <input
            name="message"
            type="text"
            ref={inputRef}
            placeholder="Type a message..."
            autoFocus
            autoComplete="off"
            className="grow rounded-none bg-slate-100 p-3 focus:outline-none dark:bg-slate-700 dark:text-white"
          />
          <button
            type="submit"
            className="flex items-center bg-blue-500 p-3 text-white transition-colors hover:bg-blue-400"
          >
            Send
          </button>
          {/* <button
            type="button"
            onClick={clearHistory()}
            className="flex items-center bg-red-500 p-3 text-white transition-colors hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-red-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          >
            Clear History
          </button> */}
        </form>
      </div>
    </>
  );
}
