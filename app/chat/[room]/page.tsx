"use server";

import { Suspense } from "react";
import Chat from "@/app/chat/[room]/chat";
import ApiRoomList from "@/app/ui/api-room-list";
import RoomListSkeleton from "@/app/ui/room-list-skeleton";

export default async function Page({ params }: { params: { room: string } }) {
  return (
    <>
      <Chat room={params.room} />
    </>
  );
}
