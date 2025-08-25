import { genders } from "../constants/const";

function FilterSidebar() {
  return (
    <aside className="hidden lg:block w-72 flex-shrink-0 lg:pl-6 sticky top-[72px]">
      <div className="sticky top-[72px] space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <h3 className="font-bold text-[#343A40] mb-3">برند</h3>
          <div className="max-h-48 overflow-auto pr-1 space-y-2">
            {["armani", "dior", "chanel", "ysl", "versace"].map((b) => (
              <label key={b} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" />
                <span className="capitalize text-sm text-[#343A40]">{b}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <h3 className="font-bold text-[#343A40] mb-3">جنسیت</h3>
          {genders.map((g) => (
            <label
              key={g}
              className="flex items-center gap-2 mb-2 cursor-pointer"
            >
              <input type="checkbox" />
              <span className="text-sm text-[#343A40]">{g}</span>
            </label>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <h3 className="font-bold text-[#343A40] mb-3">نوع عطر</h3>
          {["eau de parfum", "eau de toilette", "parfum"].map((t) => (
            <label
              key={t}
              className="flex items-center gap-2 mb-2 cursor-pointer"
            >
              <input type="checkbox" />
              <span className="text-sm capitalize text-[#343A40]">{t}</span>
            </label>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <h3 className="font-bold text-[#343A40] mb-3">موجودی</h3>
          {["موجود", "ناموجود"].map((o) => (
            <label
              key={o}
              className="flex items-center gap-2 mb-2 cursor-pointer"
            >
              <input type="checkbox" />
              <span className="text-sm text-[#343A40]">{o}</span>
            </label>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <h3 className="font-bold text-[#343A40] mb-3">بازه قیمت</h3>
          <div className="flex items-center gap-3">
            <input type="range" className="w-full" />
            <input type="range" className="w-full" />
          </div>
          <div className="text-xs text-gray-600 mt-2">0 - 1,000,000</div>
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
