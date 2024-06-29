"use client";

function generateRandomUsername() {
  return `user-${(Math.random() + 1).toString(36).substring(7)}`;
}

export function initOrFetchUsername() {
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
