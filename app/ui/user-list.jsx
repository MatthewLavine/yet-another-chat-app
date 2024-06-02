"use client";

export default function UserList({ users }) {
  return (
    <div className="ml-5 flex min-h-72 flex-col rounded-lg">
      <div className="rounded-t-lg bg-slate-700 pb-2 pl-5 pr-5 pt-2 text-slate-100">
        <h2 className="text-lg">Users ({users.length})</h2>
      </div>
      <div className="flex-grow rounded-b-lg bg-slate-600 p-5 text-slate-100">
        {users.map((user, index) => (
          <div key={index}>
            <span className="cursor-pointer">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
