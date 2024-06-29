"use client";

import { useState } from "react";
import { initOrFetchUsername, saveUsername } from "@/app/util";

export default function Page() {
  const [username, setUsername] = useState(initOrFetchUsername());

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!username) {
      console.log("Username cannot be empty");
      return;
    }

    console.log("new username", username);

    saveUsername(username);
  }

  return (
    <>
      <div className="h-full bg-slate-100 p-5 dark:bg-slate-700 dark:text-white">
        <p className="text-lg">Settings</p>
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
      </div>
    </>
  );
}
