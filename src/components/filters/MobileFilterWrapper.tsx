"use client";

import { useState } from "react";
import FiltersMobile from "./FiltersMobile";

function MobileFilterWrapper() {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => setShowFilters((v) => !v);

  return (
    <>
      <button
        className="lg:hidden w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm font-semibold text-[#343A40] active:scale-[0.99] transition"
        onClick={toggleFilters}
      >
        {showFilters ? "پنهان کردن فیلترها" : "نمایش فیلترها"}
      </button>

      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          showFilters ? "max-h-[1200px] opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <FiltersMobile />
      </div>
    </>
  );
}

export default MobileFilterWrapper;
