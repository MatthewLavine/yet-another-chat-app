"use server";

import { Suspense } from "react";

import ApiRoomList from "@/app/ui/api-room-list";
import RoomListSkeleton from "@/app/ui/room-list-skeleton";

export default async function Page() {
  return (
    <>
      <Suspense fallback={<RoomListSkeleton />}>
        <ApiRoomList />
      </Suspense>
    </>
  );
}
