import Link from "next/link";
import { getRooms } from "@/app/actions";

export default async function Rooms() {
  const rooms = await getRooms();

  return (
    <>
      <div className="flex h-screen w-60 flex-col bg-slate-100 p-5 dark:bg-slate-700 dark:text-white">
        <h2 className="text-lg">Rooms ({rooms.length})</h2>
        {rooms.map((room, index) => (
          <div key={index} className="p-2">
            <Link href={`/chat/${room}`}>{room}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
