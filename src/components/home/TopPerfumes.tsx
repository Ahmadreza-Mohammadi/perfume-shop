import { SampleTopPerfumes } from "../constants/SampleTopPerfumes";

function TopPerfumes() {
  return (
    <div className="flex flex-col gap-6">
      {/* Enhanced Header Section */}
      <div className="flex justify-between items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-gradient-to-b from-[#343A40] to-[#495057] rounded-full"></div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#343A40]">
            بیشترین بازدید
          </h2>
        </div>
        <a
          href="/products"
          className="text-sm sm:text-base text-[#343A40] hover:text-[#495057] font-medium transition-colors duration-200 hover:underline underline-offset-4"
        >
          مشاهده همه
        </a>
      </div>

      {/* Enhanced Horizontal Scroll Container */}
      <div className="relative group">
        {/* Gradient Overlays for Scroll Indication */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Scrollable Content */}
        <div className="flex gap-4 px-6 overflow-x-auto scrollbar-hide scroll-smooth">
          {SampleTopPerfumes.map((perfume, index) => (
            <div key={index} className="group/item py-2 relative flex-shrink-0">
              <button
                className="
                  relative px-6 py-3 rounded-2xl 
                  bg-gradient-to-br from-white to-gray-50 
                  border border-gray-200 
                  shadow-sm hover:shadow-lg 
                  transition-all duration-300 ease-out
                  hover:scale-105 hover:-translate-y-1
                  active:scale-95 active:translate-y-0
                  focus:outline-none focus:ring-2 focus:ring-[#343A40] focus:ring-opacity-20
                  cursor-pointer
                  whitespace-nowrap
                "
              >
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#343A40] to-[#495057] opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>

                {/* Text Content */}
                <span className="relative z-10 text-sm sm:text-base font-semibold text-[#343A40] group-hover/item:text-white transition-colors duration-300">
                  {perfume}
                </span>

                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#343A40]/20 to-[#495057]/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopPerfumes;
