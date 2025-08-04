function FiltersBar() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between px-6 font-semibold text-sm">
        <span>بیشترین بازدید</span>
        <span>مشاهده همه</span>
      </div>
      <div className="relative">
        <div className="flex gap-3 px-6 overflow-x-auto custom-scrollbar">
          <span className="bg-[#343A40] text-white font-semibold px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#495057] transition-colors duration-200 cursor-pointer">
            Dior
          </span>
          <span className="bg-[#343A40] text-white font-semibold px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#495057] transition-colors duration-200 cursor-pointer">
            Mont Blanc
          </span>
          <span className="bg-[#343A40] text-white font-semibold px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#495057] transition-colors duration-200 cursor-pointer">
            Lalique
          </span>
          <span className="bg-[#343A40] text-white font-semibold px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#495057] transition-colors duration-200 cursor-pointer">
            Louis Vuitton
          </span>
          <span className="bg-[#343A40] text-white font-semibold px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#495057] transition-colors duration-200 cursor-pointer">
            Versace
          </span>
          <span className="bg-[#343A40] text-white font-semibold px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#495057] transition-colors duration-200 cursor-pointer">
            Amouage
          </span>
          <span className="bg-[#343A40] text-white font-semibold px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#495057] transition-colors duration-200 cursor-pointer">
            Chanel
          </span>
          <span className="bg-[#343A40] text-white font-semibold px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#495057] transition-colors duration-200 cursor-pointer">
            Gucci
          </span>
          <span className="bg-[#343A40] text-white font-semibold px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#495057] transition-colors duration-200 cursor-pointer">
            Giorgio Armani
          </span>
          <span className="bg-[#343A40] text-white font-semibold px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#495057] transition-colors duration-200 cursor-pointer">
            brand10
          </span>
          <span className="bg-[#343A40] text-white font-semibold px-4 py-2 rounded-full whitespace-nowrap hover:bg-[#495057] transition-colors duration-200 cursor-pointer">
            brand11
          </span>
        </div>
      </div>
    </div>
  );
}

export default FiltersBar;
