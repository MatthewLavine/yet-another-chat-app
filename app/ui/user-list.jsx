"use client";

export default function UserList({ users }) {
  return (
    <div className="ml-5 min-h-72 rounded-lg bg-slate-600 p-5 text-slate-100">
      <h2 className="text-lg">Users ({users.length})</h2>
      {users.map((user, index) => (
        <div key={index}>
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
}
