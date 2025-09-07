"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import moon from "../../../public/moon.svg";
import sun from "../../../public/sun.svg";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      className="cursor-pointer p-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      type="button"
    >
      {resolvedTheme === "dark" ? (
        <Image className="h-6 w-6" src={moon} alt="dark" />
      ) : (
        <Image className="h-6 w-6" src={sun} alt="light" />
      )}
    </button>
  );
}
