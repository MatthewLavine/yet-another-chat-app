export default async function RoomListSkeleton() {
  return (
    <div className="mr-5 flex min-h-72 flex-col rounded-lg">
      <div className="rounded-t-lg bg-slate-700 pb-2 pl-5 pr-5 pt-2 text-slate-100">
        <h2 className="text-lg">Rooms (?)</h2>
      </div>
      <div className="flex-grow rounded-b-lg bg-slate-600 pb-2 pl-5 pr-5 pt-2 text-slate-100">
        Loading...
      </div>
    </div>
  );
}
