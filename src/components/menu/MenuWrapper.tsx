"use client";
import { usePathname } from "next/navigation";
import Menu from "./Menu";

export default function MenuWrapper() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register") return null;
  return <Menu />;
}
