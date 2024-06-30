"use client";

import Link from "next/link";
import clsx from "clsx";
import CreateRoomForm from "@/app/ui/create-room-form";
import { InitOrFetchStarredRooms, ToggleRoomStarred } from "@/app/util";

import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function RoomList({ rooms, connected, currentRoom }) {
  const [starredRoomsPreference, setStarredRoomsPreference] = useState(
    InitOrFetchStarredRooms(),
  );

  const StarToggleRoom = (room) => {
    ToggleRoomStarred(room);
    setStarredRoomsPreference(InitOrFetchStarredRooms());
  };

  const starredRooms = rooms.filter((room) =>
    starredRoomsPreference.includes(room.name),
  );

  const unstarredRooms = rooms.filter(
    (room) => !starredRoomsPreference.includes(room.name),
  );

  let output;
  if (rooms.length === 0) {
    output = <div className="cursor-default p-2">Loading...</div>;
  } else {
    const starredOutput = [];
    if (starredRooms.length > 0) {
      starredOutput.push(
        <div key="starred" className="py-2">
          <h3 className="cursor-default text-sm font-medium">Starred</h3>
        </div>,
      );
    }
    starredOutput.push(
      starredRooms.map((room, index) => (
        <div
          key={index}
          className={clsx("p-2", currentRoom === room.name && "font-bold")}
        >
          <div className="flex flex-row">
            <Link href={`/chat/${room.name}`} className="flex-grow">
              {room.name}
            </Link>
            <FontAwesomeIcon
              icon={fasStar}
              className="cursor-pointer"
              onClick={(e) => StarToggleRoom(room.name)}
            />
          </div>
        </div>
      )),
    );

    const unstarredOutput = [];

    if (starredRooms.length > 0) {
      starredOutput.push(
        <div key="unstarred" className="py-2">
          <hr className="my-2 mr-2 h-px flex-grow border-0 bg-gray-300 dark:bg-gray-600" />
        </div>,
      );
    }

    unstarredOutput.push(
      unstarredRooms.map((room, index) => (
        <div
          key={index}
          className={clsx("p-2", currentRoom === room.name && "font-bold")}
        >
          <div className="flex flex-row">
            <Link href={`/chat/${room.name}`} className="flex-grow">
              {room.name}
            </Link>
            <FontAwesomeIcon
              icon={farStar}
              className="cursor-pointer"
              onClick={(e) => StarToggleRoom(room.name)}
            />
          </div>
        </div>
      )),
    );

    output = [starredOutput, unstarredOutput];
  }

  return (
    <>
      <div className="hidden w-60 flex-col bg-slate-100 dark:bg-slate-700 dark:text-white md:flex">
        <div className="flex-grow p-5">
          <h2 className="cursor-default text-lg">Rooms ({rooms.length})</h2>
          <div className="flex-grow">{output}</div>
        </div>
        <CreateRoomForm />
      </div>
    </>
  );
}
