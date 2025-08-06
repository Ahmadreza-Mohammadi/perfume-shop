import Image from "next/image";
import bellIcon from "../../../public/bell.svg";
import profile from "../../../public/profile.svg";

function HomeHeader() {
  return (
    <div className="flex justify-between items-center p-2 bg-[#fff] rounded-b-xl">
      <div className="flex gap-3">
        {/* <ThemeToggle /> */}
        <Image
          src={bellIcon}
          className="w-6 h-6 cursor-pointer"
          alt="notifications"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span>صبح بخیر</span>
          <span className="font-semibold">علیرضا سعیدی</span>
        </div>
        <a href="/profile">
          <Image
            src={profile}
            className="w-10 h-10 rounded-full cursor-pointer"
            alt="profile"
          />
        </a>
      </div>
    </div>
  );
}

export default HomeHeader;
