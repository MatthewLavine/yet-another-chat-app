export default function ChatLogSkeleton({ room }) {
  return (
    <div className="flex min-h-72 flex-grow flex-col">
      <div className="bg-slate-700 pb-2 pl-5 pr-5 pt-2 text-slate-100">
        <h2 className="text-lg">{room}</h2>
      </div>
      <div className="flex-grow overflow-scroll bg-slate-600 p-5 text-slate-100">
        Loading...
      </div>
    </div>
  );
}
