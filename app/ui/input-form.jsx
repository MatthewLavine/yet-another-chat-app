"use client";

import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function InputForm({ socket, username, updateUsername }) {
  const usernameRef = useRef(null);
  const inputRef = useRef(null);

  const updateUsernameDebounced = useDebouncedCallback((newUsername) => {
    if (newUsername === "") {
      usernameRef.current.value = username;
      return;
    }
    updateUsername(newUsername);
  }, 500);

  const sendMessage = (sender, message) => {
    if (sender === "" || message === "") {
      inputRef.current.focus();
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
    <>
      <div className="bg-slate-200">
        <form
          action={async (formData) => {
            sendMessage(username, formData.get("message"));
          }}
          className="flex flex-row"
        >
          {/* <input
            name="username"
            type="text"
            ref={usernameRef}
            placeholder="Username"
            autoComplete="off"
            defaultValue={username}
            onChange={(e) => updateUsernameDebounced(e.target.value)}
            className="w-40 border p-3"
          /> */}
          <input
            name="message"
            type="text"
            ref={inputRef}
            placeholder="Type a message..."
            autoFocus
            autoComplete="off"
            className="grow border p-3 focus:outline-none"
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
