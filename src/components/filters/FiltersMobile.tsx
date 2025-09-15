function FiltersMobile() {
  return (
    <div className="lg:hidden">
      <button className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm font-semibold text-[#343A40] mb-3">
        فیلترها
      </button>

      <div className="space-y-4 bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
        <div>
          <h3 className="font-bold text-[#343A40] mb-2">برند</h3>
          <div className="flex flex-wrap gap-2">
            {["armani", "dior", "chanel", "ysl", "versace"].map((b) => (
              <span
                key={b}
                className="px-3 py-1.5 rounded-full border text-sm bg-gray-50 text-[#343A40] border-gray-200"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[#343A40] mb-2">جنسیت</h3>
          <div className="flex gap-2 flex-wrap">
            {["مردانه", "زنانه", "یونی‌سکس"].map((g) => (
              <span
                key={g}
                className="px-3 py-1.5 rounded-full border text-sm bg-gray-50 text-[#343A40] border-gray-200"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[#343A40] mb-2">نوع عطر</h3>
          <div className="flex gap-2 flex-wrap">
            {["eau de parfum", "eau de toilette", "parfum"].map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-full border text-sm bg-gray-50 text-[#343A40] border-gray-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[#343A40] mb-2">موجودی</h3>
          <div className="flex gap-2 flex-wrap">
            {["موجود", "ناموجود"].map((o) => (
              <span
                key={o}
                className="px-3 py-1.5 rounded-full border text-sm bg-gray-50 text-[#343A40] border-gray-200"
              >
                {o}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[#343A40] mb-2">بازه قیمت</h3>
          <div className="flex items-center gap-3">
            <input type="range" className="w-full" />
            <input type="range" className="w-full" />
          </div>
          <div className="text-xs text-gray-600 mt-2">0 - 1,000,000</div>
        </div>
      </div>
    </div>
  );
}

export default FiltersMobile;
