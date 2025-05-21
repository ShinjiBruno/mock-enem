"use client";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Github } from "lucide-react";

export default function SimpleHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-background border-b">
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
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">☀️</span>
          <Switch
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            aria-label="Alternar tema"
          />
          <span className="text-xs text-muted-foreground">🌙</span>
        </div>
      </div>
    </header>
  );
}
