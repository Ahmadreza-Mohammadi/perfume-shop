import Image from "next/image";
import bellIcon from "../../../public/bell.svg";
import profile from "../../../public/profile.svg";

function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="relative">
        {/* Background matching other components */}
        <div className="absolute inset-0 bg-[#fff] border-b border-gray-200 shadow-sm"></div>

        {/* Main header content */}
        <div className="relative flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4">
          {/* right side - Notification bell */}
          <div className="flex items-center ">
            <button
              className="group relative p-2.5 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-out shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300"
              aria-label="Notifications"
            >
              <Image
                src={bellIcon}
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
                alt="notifications"
              />
              {/* Notification indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
            </button>
          </div>

          {/* Right side - User info and profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* User greeting and name */}
            <div className="flex flex-col items-end sm:items-start">
              <span className="text-sm sm:text-base text-gray-600 font-medium leading-tight">
                صبح بخیر
              </span>
              <span className="text-base sm:text-lg font-bold text-[#343A40] leading-tight">
                علیرضا سعیدی
              </span>
            </div>

            {/* Profile image */}
            <a
              href="/profile"
              className="group relative block"
              aria-label="Profile"
            >
              <div className="relative p-1 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-out shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300">
                <Image
                  src={profile}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-all duration-300 ease-out group-hover:scale-105 group-active:scale-95 shadow-sm"
                  alt="profile"
                />
                {/* Subtle hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-[#343A40] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
