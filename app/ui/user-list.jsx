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
      <div key={index} className="p-2">
        <span className="cursor-pointer">{user.name}</span>
      </div>
    ));
  }

  return (
    <div className="flex w-40 flex-col bg-slate-100 p-5">
      <h2 className="text-lg">Users ({users.length})</h2>
      <div className="flex-grow">{output}</div>
    </div>
  );
}
