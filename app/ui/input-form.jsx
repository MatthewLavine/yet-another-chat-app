'use client';

import { useRef } from 'react'

export default function InputForm({ socket, addMessage, username, setUsername }) {
    const inputRef = useRef(null);

    const sendMessage = (sender, message) => {
        if (sender === "" || message === "") {
            return;
        }
        console.log("sending message: %s", message)
        socket.emit("chat message", {
            time: new Date().toISOString().split('T')[1],
            sender: sender,
            content: message,
        });
        inputRef.current.value = "";
        inputRef.current.focus();
    }

    return (
        <form
            action={async (formData) => {
                sendMessage(
                    formData.get("username"),
                    formData.get("message")
                );
            }}
            className="flex flex-row w-full gap-5">
            <input
                name="username"
                type="text"
                placeholder="Username"
                autoComplete="off"
                defaultValue={username}
                className="rounded-lg p-2 border border-blue-500"
            />
            <input
                name="message"
                type="text"
                ref={inputRef}
                placeholder="Type a message..."
                autoFocus
                autoComplete="off"
                className="grow rounded-lg p-2 border border-blue-500" />
            <button
                type="submit"
                className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">Send</button>
        </form>
    );
};