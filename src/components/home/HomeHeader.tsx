"use client";

import Image from "next/image";
import bellIcon from "../../../public/bell.svg";
import ThemeToggle from "../theme/ThemeToggle";
import { useTheme } from "next-themes";


function HomeHeader() {
  const { theme } = useTheme();
  console.log(theme);

  return (
    <div className="flex justify-between items-center p-2 bg-[#F3F3F3] rounded-b-xl">
      <div className="flex gap-3">
        {/* <ThemeToggle /> */}

        <Image
          src={bellIcon}
          className="w-6 h-6 cursor-pointer"
          alt="favorites"
        />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col bg-orange-400">
          <span>صبح بخیر</span>
          <span className="font-semibold">علیرضا</span>
        </div>
        <div>profile</div>
      </div>
    </div>
  );
}

export default HomeHeader;
