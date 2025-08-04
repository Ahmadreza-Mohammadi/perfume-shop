"use client";

import Image from "next/image";
import homeBlack from "../../../public/home-black.svg";
import homeWhite from "../../../public/home-white.svg";
import cartBlack from "../../../public/cart-black.svg";
import cartWhite from "../../../public/cart-white.svg";
import ordersBlack from "../../../public/orders-black.svg";
import ordersWhite from "../../../public/orders-white.svg";
import walletBlack from "../../../public/wallet-black.svg";
import walletWhite from "../../../public/wallet-white.svg";
import profileBlack from "../../../public/profile-black.svg";
import profileWhite from "../../../public/profile-white.svg";
import { useRouter, usePathname } from "next/navigation";

function Menu() {
  const router = useRouter();
  const pathname = usePathname();
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="sm:w-[420px] md:w-[640px] lg:w-[768px] xl:w-[1024px] m-auto flex justify-center bg-[#fff]  rounded-t-xl fixed bottom-0 left-0 right-0 py-2">
      <div className=" flex w-full justify-around">
        <div className="flex flex-col items-center gap-1">
          <Image
            onClick={() => handleNavigation("/home")}
            className="w-6 h-6 cursor-pointer"
            src={pathname === "/home" ? homeBlack : homeWhite}
            alt="home"
          />
          <span className="text-sm font-semibold">خانه</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Image
            onClick={() => handleNavigation("/cart")}
            className="w-6 h-6 cursor-pointer"
            src={pathname === "/cart" ? cartBlack : cartWhite}
            alt="cart"
          />
          <span className="text-sm font-semibold">سبد خرید</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Image
            onClick={() => handleNavigation("/orders")}
            className="w-6 h-6 cursor-pointer"
            src={pathname === "/orders" ? ordersBlack : ordersWhite}
            alt="orders"
          />
          <span className="text-sm font-semibold">سفارش ها</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Image
            onClick={() => handleNavigation("/wallet")}
            className="w-6 h-6 cursor-pointer"
            src={pathname === "/wallet" ? walletBlack : walletWhite}
            alt="wallet"
          />
          <span className="text-sm font-semibold">کیف پول</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Image
            onClick={() => handleNavigation("/profile")}
            className="w-6 h-6 cursor-pointer"
            src={pathname === "/profile" ? profileBlack : profileWhite}
            alt="profile"
          />
          <span className="text-sm font-semibold">پروفایل</span>
        </div>
      </div>
    </div>
  );
}

export default Menu;
