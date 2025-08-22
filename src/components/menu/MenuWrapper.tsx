"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Menu from "./Menu";

export default function MenuWrapper() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  // Hide menu on login/register pages
  if (pathname === "/login" || pathname === "/register") return null;

  // Add entrance animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        transition-all duration-500 ease-out
        ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }
      `}
    >
      <Menu />
    </div>
  );
}
