"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import RoomsSkeleton from "@/app/ui/rooms-skeleton";
import { InitOrFetchStarredRooms, ToggleRoomStarred } from "@/app/util";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Rooms() {
  const [rooms, setRooms] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [starredRoomsPreference, setStarredRoomsPreference] = useState(
    InitOrFetchStarredRooms(),
  );

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/rooms`)
      .catch((e) => {
        throw new Error("Failed to fech rooms: " + e);
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unexpected status code: " + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setRooms(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return RoomsSkeleton();
  }

  const StarToggleRoom = (room) => {
    ToggleRoomStarred(room);
    setStarredRoomsPreference(InitOrFetchStarredRooms());
  };

  const starredRooms = rooms.filter((room) =>
    starredRoomsPreference.includes(room),
  );

  const unstarredRooms = rooms.filter(
    (room) => !starredRoomsPreference.includes(room),
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
        <div key={index} className="p-2">
          <div className="flex flex-row">
            <Link href={`/chat/${room}`} className="flex-grow">
              {room}
            </Link>
            <FontAwesomeIcon
              icon={fasStar}
              className="cursor-pointer"
              onClick={(e) => StarToggleRoom(room)}
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
        <div key={index} className="p-2">
          <div className="flex flex-row">
            <Link href={`/chat/${room}`} className="flex-grow">
              {room}
            </Link>
            <FontAwesomeIcon
              icon={farStar}
              className="cursor-pointer"
              onClick={(e) => StarToggleRoom(room)}
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
      </div>
    </>
  );
}
