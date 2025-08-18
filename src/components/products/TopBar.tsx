import Image from "next/image";
import searchIcon from "../../../public/search.svg";

function TopBar() {
  return (
    <div className="w-full sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 sm:gap-4">
        <h1 className="text-lg sm:text-xl font-extrabold text-[#343A40]">
          محصولات
        </h1>

        <div className="flex-1" />

        <div className="flex items-center gap-2 sm:gap-3 w-full max-w-md">
          <div className="relative flex-1">
            <input
              placeholder="جستجو در محصولات..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[#343A40] placeholder:text-gray-400"
            />
            <Image
              src={searchIcon}
              alt="search"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70"
            />
          </div>
          <button className="px-3 sm:px-4 py-2 rounded-xl bg-gray-100 text-[#343A40] text-sm font-semibold border border-gray-200">
            بازنشانی
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
