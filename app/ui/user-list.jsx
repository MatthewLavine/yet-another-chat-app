"use client";

export default function UserList({ users, connected }) {
  let output;
  if (users.length === 0) {
    output = <div className="p-2">Loading...</div>;
  } else {
    output = users.map((user, index) => (
      <div key={index} className="p-2">
        <span className="cursor-pointer">{user.name}</span>
      </div>
    ));
  }

  return (
    <div className="hidden w-40 shrink-0 flex-col bg-slate-100 p-5 dark:bg-slate-700 dark:text-white md:flex">
      <h2 className="text-lg">Users ({users.length})</h2>
      <div className="flex-grow">{output}</div>
    </div>
  );
}
