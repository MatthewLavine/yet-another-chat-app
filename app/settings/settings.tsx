"use client";

import { useState } from "react";
import {
  InitOrFetchJoinPartPreference,
  InitOrFetchUsername,
  saveJoinPartPreference,
  saveUsername,
} from "@/app/util";

export default function Settings() {
  const [username, setUsername] = useState(InitOrFetchUsername());
  const [hideJoinPart, setHideJoinPart] = useState(
    InitOrFetchJoinPartPreference(),
  );

  const handleHideJoinPartChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setHideJoinPart(event.target.checked);
    saveJoinPartPreference(event.target.checked);
  };

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
        <form>
          <label>
            Hide Join/Part messages:&nbsp;
            <input
              type="checkbox"
              onChange={(e) => handleHideJoinPartChange(e)}
              checked={hideJoinPart}
            />
          </label>
        </form>
      </div>
    </>
  );
}
