"use client";

import Link from "next/link";

export default function RoomList({ rooms, connected }) {
  let output;
  if (rooms.length === 0) {
    if (connected) {
      output = <div>Loading...</div>;
    } else {
      output = <div>Disconnected.</div>;
    }
  } else {
    output = rooms.map((room, index) => (
      <div key={index} className="mt-1">
        <Link href={`/chat/${room.name}`}>{room.name}</Link>
      </div>
    ));
  }

  return (
    <div className="mr-5 flex min-h-72 flex-col rounded-lg">
      <div className="rounded-t-lg bg-slate-700 pb-2 pl-5 pr-5 pt-2 text-slate-100">
        <h2 className="text-lg">Rooms ({rooms.length})</h2>
      </div>
      <div className="flex-grow rounded-b-lg bg-slate-600 pb-2 pl-5 pr-5 pt-2 text-slate-100">
        {output}
      </div>
    </div>
  );
}
