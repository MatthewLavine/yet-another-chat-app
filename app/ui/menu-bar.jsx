"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

import {
  faHouse,
  faGear,
  faY,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenuBar() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex w-16 flex-col bg-slate-200 text-center text-2xl dark:bg-slate-800 dark:text-white">
        <Link href="/" className="p-5">
          <FontAwesomeIcon icon={faY} />
        </Link>
        <Link href="/" className="p-5">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <Link href="/settings" className="p-5">
          <FontAwesomeIcon icon={faGear} />
        </Link>
        <Link
          href="https://github.com/MatthewLavine/yet-another-chat-app"
          target="_blank"
          className="p-5"
        >
          <FontAwesomeIcon icon={faGithub} />
        </Link>
        <button onClick={() => setTheme("light")} className="p-5">
          <FontAwesomeIcon icon={faSun} />
        </button>
        <button onClick={() => setTheme("dark")} className="p-5">
          <FontAwesomeIcon icon={faMoon} />
        </button>
      </div>
    </>
  );
}
