"use client";

function generateRandomUsername() {
  return `user-${(Math.random() + 1).toString(36).substring(7)}`;
}

export function InitOrFetchUsername() {
  let storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    return storedUsername;
  }
  const randomUsername = generateRandomUsername();
  localStorage.setItem("username", randomUsername);
  return randomUsername;
}

export function saveUsername(newUsername: string) {
  localStorage.setItem("username", newUsername);
}

export function InitOrFetchStarredRooms() {
  let starredRooms = localStorage.getItem("starredRooms");
  if (starredRooms) {
    return JSON.parse(starredRooms);
  }
  localStorage.setItem("starredRooms", JSON.stringify([]));
  return [];
}

export function starRoom(room: string) {
  let starredRooms = InitOrFetchStarredRooms();
  starredRooms.push(room);
  localStorage.setItem("starredRooms", JSON.stringify(starredRooms));
}

export function unstarRoom(room: string) {
  let starredRooms = InitOrFetchStarredRooms();
  starredRooms = starredRooms.filter((r: string) => r !== room);
  localStorage.setItem("starredRooms", JSON.stringify(starredRooms));
}

export function isRoomStarred(room: string) {
  let starredRooms = InitOrFetchStarredRooms();
  return starredRooms.includes(room);
}

export function ToggleRoomStarred(room: string) {
  console.log("ToggleRoomStarred", room);
  isRoomStarred(room) ? unstarRoom(room) : starRoom(room);
}
