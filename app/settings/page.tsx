"use client";

import { useState } from "react";

export default function Page() {
  const [username, setUsername] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("username", username);
  }

  return (
    <>
      <p>Settings</p>
      <form onSubmit={handleSubmit}>
        <label>
          Pick a username:
          <input
            type="text"
            name="username"
            placeholder="Username"
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type="submit" className="rounded-lg bg-green-500 p-2">
          Save
        </button>
      </form>
    </>
  );
}
