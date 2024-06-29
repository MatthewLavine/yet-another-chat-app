"use server";

import Rooms from "@/app/ui/rooms";
import RoomsSkeleton from "@/app/ui/rooms-skeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <div className="flex flex-row">
        <Suspense fallback={<RoomsSkeleton />}>
          <Rooms />
        </Suspense>
        <div className="h-screen grow bg-slate-200 dark:bg-slate-800"></div>
      </div>
    </>
  );
}
