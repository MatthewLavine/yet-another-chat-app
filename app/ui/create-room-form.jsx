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
    <>
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
          className="p-3 text-black focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 p-3 text-center text-white transition-colors hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 active:bg-yellow-600"
        >
          Create Room
        </button>
      </form>
    </>
  );
}
