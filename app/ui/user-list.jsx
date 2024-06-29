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
    <div className="hidden w-40 flex-col bg-slate-100 p-5 md:flex dark:bg-slate-700 dark:text-white">
      <h2 className="text-lg">Users ({users.length})</h2>
      <div className="flex-grow">{output}</div>
    </div>
  );
}
