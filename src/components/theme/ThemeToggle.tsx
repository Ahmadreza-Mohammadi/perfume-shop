"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import moon from "../../../public/moon.svg";
import sun from "../../../public/sun.svg";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button className="cursor-pointer" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" && <Image className="h-6 w-6" src={moon} alt="dark" />}
      {theme === "light" && <Image className="h-6 w-6" src={sun} alt="light" />}
    </button>
  );
}
