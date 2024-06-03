"use client";

import Link from "next/link";
import clsx from "clsx";

export default function RoomList({ rooms, connected, currentRoom }) {
  let output;
  if (rooms.length === 0) {
    if (connected) {
      output = <div>Loading...</div>;
    } else {
      output = <div>Disconnected.</div>;
    }
  } else {
    output = rooms.map((room, index) => (
      <div
        key={index}
        className={clsx("mt-1", currentRoom === room.name && "font-bold")}
      >
        <Link href={`/chat/${room.name}`}>{room.name}</Link>
      </div>
    ));
  }

  return (
    <div className="mr-5 hidden min-h-72 w-40 flex-col rounded-lg md:flex">
      <div className="rounded-t-lg bg-slate-700 pb-2 pl-5 pr-5 pt-2 text-slate-100">
        <h2 className="text-lg">Rooms ({rooms.length})</h2>
      </div>
      <div className="flex-grow rounded-b-lg bg-slate-600 pb-2 pl-5 pr-5 pt-2 text-slate-100">
        {output}
      </div>
    </div>
  );
}
