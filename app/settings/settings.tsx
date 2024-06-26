"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
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

  const handleUsernameChangeDebounced = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newUsername = event.target.value;
      console.log("new username", newUsername);
      if (!newUsername) {
        console.log("Username cannot be empty");
        return;
      }
      setUsername(newUsername);
      saveUsername(newUsername);
    },
    500,
  );

  return (
    <>
      <div className="h-full bg-slate-100 p-5 dark:bg-slate-700 dark:text-white">
        <p className="cursor-default text-lg">Settings</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <p className="cursor-default py-2 text-sm font-medium">General</p>
          <div className="p-2">
            <label>
              Pick a username:&nbsp;
              <input
                type="text"
                name="username"
                placeholder="Username"
                defaultValue={username}
                onChange={handleUsernameChangeDebounced}
              />
            </label>
          </div>
          <div className="p-2">
            <label>
              Hide Join/Part messages:&nbsp;
              <input
                type="checkbox"
                onChange={(e) => handleHideJoinPartChange(e)}
                checked={hideJoinPart}
              />
            </label>
          </div>
          <p className="cursor-default py-2 text-sm font-medium">
            Notifications
          </p>
          <p className="cursor-default p-2">TODO</p>
          <p className="cursor-default py-2 text-sm font-medium">Theme</p>
          <p className="cursor-default p-2">TODO</p>
        </form>
      </div>
    </>
  );
}
