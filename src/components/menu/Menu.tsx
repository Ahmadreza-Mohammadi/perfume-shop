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

function Menu() {
  const router = useRouter();
  const pathname = usePathname();

  // Navigation handler with smooth transition
  const handleNavigation = (path: string) => {
    // Add a subtle delay for better UX during navigation
    setTimeout(() => {
      router.push(path);
    }, 150);
  };

  return (
    <div className="w-full sticky bottom-0 z-30 backdrop-blur border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-1">
        <div className="sm:w-[420px] md:w-[640px] lg:w-[768px] xl:w-[1024px] m-auto flex justify-center rounded-t-xl ">
          <div className="flex w-full justify-around">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <div
                  key={item.path}
                  className="flex flex-col items-center gap-1 group relative"
                >
                  {/* Animated background indicator for active state */}
                  {isActive && (
                    <div className="absolute -top-2 w-12 h-12 bg-gray-50 rounded-full opacity-80 animate-pulse" />
                  )}

                  {/* Menu item container with hover animations */}
                  <div
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      relative z-10 flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer
                      transition-all duration-300 ease-out
                      hover:scale-110 hover:bg-gray-50 hover:shadow-md
                      active:scale-95 active:transition-transform active:duration-100
                      ${
                        isActive
                          ? "transform scale-105"
                          : "hover:transform hover:scale-110"
                      }
                    `}
                  >
                    {/* Icon with smooth transition and hover effects */}
                    <div className="relative">
                      <Image
                        className={`
                          w-6 h-6 transition-all duration-300 ease-out
                          ${
                            isActive
                              ? "animate-bounce-once"
                              : "group-hover:scale-110 group-hover:rotate-3"
                          }
                        `}
                        src={isActive ? item.activeIcon : item.inactiveIcon}
                        alt={item.alt}
                      />

                      {/* Subtle glow effect for active state */}
                      {isActive && (
                        <div className="absolute inset-0 w-6 h-6 bg-[#343A40] rounded-full opacity-20 animate-ping" />
                      )}
                    </div>

                    {/* Label with smooth color transition */}
                    <span
                      className={`
                        text-sm font-semibold transition-all duration-300 ease-out
                        ${
                          isActive
                            ? "text-[#343A40] scale-105"
                            : "text-gray-500 group-hover:text-[#343A40]"
                        }
                      `}
                    >
                      {item.label}
                    </span>

                    {/* Underline indicator for active state */}
                    {isActive && (
                      <div className="absolute -bottom-1 w-8 h-0.5 bg-[#343A40] rounded-full animate-slide-in" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
