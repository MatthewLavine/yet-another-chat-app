export default async function RoomsSkeleton() {
  return (
    <>
      <div className="flex h-screen w-60 flex-col bg-slate-100 p-5">
        <h2 className="text-lg">Rooms (0)</h2>
        <div className="p-2">Loading...</div>
      </div>
    </>
  );
}
