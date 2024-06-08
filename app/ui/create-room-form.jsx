import { redirect } from "next/navigation";
import { useRef } from "react";

export default function CreateRoomForm() {
  const inputRef = useRef(null);

  const createRoom = (room) => {
    if (room === "") {
      return;
    }
    console.log("creating room: %s", room);
    inputRef.current.value = "";

    redirect(`/chat/${room}`);
  };

  return (
    <form
      action={async (formData) => {
        createRoom(formData.get("room"));
      }}
    >
      <input
        type="text"
        name="room"
        placeholder="Room name..."
        ref={inputRef}
        autoComplete="off"
        className="h-10 w-40 border border-yellow-500 p-3 text-black"
      />
      <button
        type="submit"
        className="flex h-10 w-40 items-center rounded-b-lg bg-yellow-500 p-3 text-sm font-medium text-white transition-colors hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 active:bg-yellow-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      >
        Create Room
      </button>
    </form>
  );
}
