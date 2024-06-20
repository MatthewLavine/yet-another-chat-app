"use server";

import { unstable_noStore as noStore } from "next/cache";

export async function getRooms() {
  noStore();

  try {
    const res = await fetch("http://backend:4000/api/rooms");
    if (!res.ok) {
      throw new Error("Unexpected status code: " + res.statusText);
    }
    return res.json();
  } catch (e) {
    throw new Error("Failed to fech rooms: " + e);
  }
}
