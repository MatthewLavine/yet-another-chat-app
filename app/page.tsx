"use server";

import Rooms from "@/app/ui/rooms";
import RoomsSkeleton from "@/app/ui/rooms-skeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <Suspense fallback={<RoomsSkeleton />}>
        <Rooms />
      </Suspense>
    </>
  );
}
