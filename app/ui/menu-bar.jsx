"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <div className="flex w-16 flex-col bg-slate-200 text-center text-2xl dark:bg-slate-800 dark:text-white"></div>
      </>
    );
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <>
      <div className="flex w-16 flex-col bg-slate-200 text-center text-2xl dark:bg-slate-800 dark:text-white">
        <div className="flex flex-grow flex-col">
          <Link href="/" className="p-5">
            <FontAwesomeIcon icon={faY} />
          </Link>
          <Link href="/" className="p-5">
            <FontAwesomeIcon icon={faHouse} />
          </Link>
          <Link href="/settings" className="p-5">
            <FontAwesomeIcon icon={faGear} />
          </Link>
          <button onClick={() => toggleTheme()} className="p-5">
            <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
          </button>
        </div>
        <div className="flex flex-col">
          <Link
            href="https://github.com/MatthewLavine/yet-another-chat-app"
            target="_blank"
            className="p-5"
          >
            <FontAwesomeIcon icon={faGithub} />
          </Link>
        </div>
      </div>
    </>
  );
}
