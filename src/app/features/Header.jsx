"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Github, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function SimpleHeader({ bgColor }) {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      className={`w-full flex items-center justify-between px-6 py-4 ${bgColor ? bgColor : ""}`}
    >
      <Link
        href="/"
        className="text-lg font-bold tracking-tight sm:text-xl md:text-xl"
      >
        Mock-ENEM
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="https://github.com/ShinjiBruno/mock-enem"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
          aria-label="GitHub"
        >
          <svg
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="text-foreground"
          >
            <Github />
          </svg>
          <span className="sr-only">GitHub</span>
        </Link>
        <div
          className="flex items-center gap-2  cursor-pointer hover:opacity-50"
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          {mounted ? theme === "dark" ? <Moon /> : <Sun /> : null}
        </div>
      </div>
    </header>
  );
}
