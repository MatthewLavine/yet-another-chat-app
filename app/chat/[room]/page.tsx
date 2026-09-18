import Chat from "./chat";

export default async function Page({
  params,
}: {
  params: Promise<{ room: string }>;
}) {
  const { room } = await params;

  return (
    <>
      <Chat room={room} />
    </>
  );
}
