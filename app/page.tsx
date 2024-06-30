"use client";

import dynamic from "next/dynamic";

const Rooms = dynamic(() => import("@/app/ui/rooms"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <div className="flex flex-row">
        <Rooms />
        <div className="h-screen grow bg-slate-200 dark:bg-slate-800"></div>
      </div>
    </>
  );
}
