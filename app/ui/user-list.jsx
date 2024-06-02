"use client";

export default function UserList({ users, connected }) {
  let output;
  if (users.length === 0) {
    if (connected) {
      output = <div>Loading...</div>;
    } else {
      output = <div>Disconnected.</div>;
    }
  } else {
    output = users.map((user, index) => (
      <div key={index} className="mt-1">
        <span className="cursor-pointer">{user.name}</span>
      </div>
    ));
  }

  return (
    <div className="ml-5 hidden min-h-72 w-40 flex-col rounded-lg md:flex">
      <div className="rounded-t-lg bg-slate-700 pb-2 pl-5 pr-5 pt-2 text-slate-100">
        <h2 className="text-lg">Users ({users.length})</h2>
      </div>
      <div className="flex-grow rounded-b-lg bg-slate-600 pb-2 pl-5 pr-5 pt-2 text-slate-100">
        {output}
      </div>
    </div>
  );
}
