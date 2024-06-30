"use client";

import Link from "next/link";
import clsx from "clsx";
import CreateRoomForm from "@/app/ui/create-room-form";

export default function RoomList({ rooms, connected, currentRoom }) {
  let output;
  if (rooms.length === 0) {
    output = <div className="p-2">Loading...</div>;
  } else {
    output = rooms.map((room, index) => (
      <div
        key={index}
        className={clsx("p-2", currentRoom === room.name && "font-bold")}
      >
        <Link href={`/chat/${room.name}`}>{room.name}</Link>
      </div>
    ));
  }

  return (
    <>
      <div className="hidden w-60 flex-col bg-slate-100 dark:bg-slate-700 dark:text-white md:flex">
        <div className="flex-grow p-5">
          <h2 className="text-lg">Rooms ({rooms.length})</h2>
          <div className="flex-grow">{output}</div>
        </div>
        <CreateRoomForm />
      </div>
    </>
  );
}
