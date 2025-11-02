"use client";

import Image from "next/image";
import homeBlack from "../../../public/home-black.svg";
import homeWhite from "../../../public/home-white.svg";
import cartBlack from "../../../public/cart-black.svg";
import cartWhite from "../../../public/cart-white.svg";
import ordersBlack from "../../../public/orders-black.svg";
import ordersWhite from "../../../public/orders-white.svg";
import productsBlack from "../../../public/shop-black.svg";
import productsWhite from "../../../public/shop-white.svg";
import profileBlack from "../../../public/profile-black.svg";
import profileWhite from "../../../public/profile-white.svg";
import { useRouter, usePathname } from "next/navigation";

// Menu item configuration for easy customization
const menuItems = [
  {
    path: "/home",
    label: "خانه",
    activeIcon: homeBlack,
    inactiveIcon: homeWhite,
    alt: "home",
  },
  {
    path: "/products",
    label: "محصولات",
    activeIcon: productsBlack,
    inactiveIcon: productsWhite,
    alt: "products",
  },
  {
    path: "/cart",
    label: "سبد خرید",
    activeIcon: cartBlack,
    inactiveIcon: cartWhite,
    alt: "cart",
  },
  {
    path: "/orders",
    label: "سفارش ها",
    activeIcon: ordersBlack,
    inactiveIcon: ordersWhite,
    alt: "orders",
  },
  {
    path: "/profile",
    label: "پروفایل",
    activeIcon: profileBlack,
    inactiveIcon: profileWhite,
    alt: "profile",
  },
];

export default function HeaderMenu() {
  const router = useRouter();
  const pathname = usePathname();

  // Navigation handler
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="hidden md:flex items-center gap-1">
      {menuItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer
              transition-all duration-300 ease-out
              ${
                isActive
                  ? "bg-gray-100 text-[#343A40] font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#343A40]"
              }
            `}
            aria-label={item.label}
          >
            <Image
              className="w-5 h-5 transition-all duration-300 ease-out"
              src={isActive ? item.activeIcon : item.inactiveIcon}
              alt={item.alt}
              width={20}
              height={20}
            />
            <span className="text-sm">{item.label}</span>
            {isActive && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#343A40] rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
