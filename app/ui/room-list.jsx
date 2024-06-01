"use client";

export default function RoomList({ rooms }) {
  return (
    <div className="mr-5 min-h-72 rounded-lg bg-slate-600 p-5 text-slate-100">
      <h2 className="text-lg">Rooms ({rooms.length})</h2>
      {rooms.map((room, index) => (
        <div key={index}>
          <span>{room.name}</span>
        </div>
      ))}
    </div>
  );
}
