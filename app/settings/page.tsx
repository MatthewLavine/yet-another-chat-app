"use client";

import dynamic from "next/dynamic";
const Settings = dynamic(() => import("@/app/settings/settings"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <Settings />
    </>
  );
}
