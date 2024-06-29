"use server";

import dynamic from "next/dynamic";
const Chat = dynamic(() => import("@/app/chat/[room]/chat"), {
  ssr: false,
});

export default async function Page({ params }: { params: { room: string } }) {
  return (
    <>
      <Chat room={params.room} />
    </>
  );
}
