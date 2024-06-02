"use server";

import Link from "next/link";
import { getRooms } from "@/app/actions";

export default async function ApiRoomList() {
  const rooms = await getRooms();

  return (
    <div className="mr-5 flex min-h-72 flex-col rounded-lg">
      <div className="rounded-t-lg bg-slate-700 pb-2 pl-5 pr-5 pt-2 text-slate-100">
        <h2 className="text-lg">Rooms ({rooms.length})</h2>
      </div>
      <div className="flex-grow rounded-b-lg bg-slate-600 pb-2 pl-5 pr-5 pt-2 text-slate-100">
        {rooms.map((room, index) => (
          <div key={index} className="mt-1">
            <Link href={`/chat/${room}`}> - {room}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
