"use server";

import Chat from "@/app/chat/[room]/chat";

export default async function Page({ params }: { params: { room: string } }) {
  return (
    <>
      <Chat room={params.room} />
    </>
  );
}
