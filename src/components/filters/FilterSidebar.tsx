"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  brands,
  filterGenders,
  perfumeTypes,
} from "../constants/const";

function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function toggleParam(key: string, value: string) {
  const params = new URLSearchParams(searchParams.toString());

  if (key === "gender") {
    const current = params.get("gender");
    if (current === value) {
      params.delete("gender");
    } else {
      params.set("gender", value);
    }
  } else {
    const current = params.getAll(key);
    if (current.includes(value)) {
      const next = current.filter((v) => v !== value);
      params.delete(key);
      next.forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }
  }

  router.push(`/products?${params.toString()}`);
}


  function setRange(min: number, max: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("price", `${min}-${max}`);
    router.push(`/products?${params.toString()}`);
  }

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0 lg:pl-6 sticky top-[72px]">
      <div className="sticky top-[72px] space-y-4">
        {/* brands */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <h3 className="font-bold text-[#343A40] mb-3">برند</h3>
          <div className="max-h-48 overflow-auto pr-1 space-y-2">
            {brands.map((b) => (
              <label key={b} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={searchParams.getAll("brand").includes(b)}
                  onChange={() => toggleParam("brand", b)}
                />
                <span className="capitalize text-sm text-[#343A40]">{b}</span>
              </label>
            ))}
          </div>
        </div>

        {/* gender */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <h3 className="font-bold text-[#343A40] mb-3">جنسیت</h3>
          {filterGenders.map((g) => (
            <label
              key={g}
              className="flex items-center gap-2 mb-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={searchParams.getAll("gender").includes(g)}
                onChange={() => toggleParam("gender", g)}
              />
              <span className="text-sm text-[#343A40]">{g}</span>
            </label>
          ))}
        </div>

        {/* perfume mode */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <h3 className="font-bold text-[#343A40] mb-3">نوع عطر</h3>
          {perfumeTypes.map((t) => (
            <label
              key={t}
              className="flex items-center gap-2 mb-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={searchParams.getAll("perfumeType").includes(t)}
                onChange={() => toggleParam("perfumeType", t)}
              />
              <span className="text-sm capitalize text-[#343A40]">{t}</span>
            </label>
          ))}
        </div>

          {/* price range  */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <h3 className="font-bold text-[#343A40] mb-3">بازه قیمت</h3>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={1000000}
              step={50000}
              onChange={(e) => setRange(Number(e.target.value), 1000000)}
              className="w-full"
            />
            <input
              type="range"
              min={0}
              max={1000000}
              step={50000}
              onChange={(e) => setRange(0, Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="text-xs text-gray-600 mt-2">
            {searchParams.get("price") || "0 - 1,000,000"}
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          filters
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
