"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { availability, brands, genders, perfumeTypes } from "../constants/const";



function FiltersMobile() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

  useEffect(() => {
    // sync with URL on mount / URL change
    setSelectedBrands(searchParams.getAll("brand"));
    setSelectedGender(searchParams.get("gender"));
    setSelectedTypes(searchParams.getAll("perfumeType"));
    setSelectedAvailability(searchParams.getAll("availability"));
    const price = searchParams.get("price");
    if (price) {
      const [min, max] = price.split("-").map(Number);
      setPriceRange([min, max]);
    }
  }, [searchParams]);

  function toggleBrand(b: string) {
    const next = selectedBrands.includes(b)
      ? selectedBrands.filter((x) => x !== b)
      : [...selectedBrands, b];
    setSelectedBrands(next);
    updateParams({ brand: next });
  }

  function selectGender(g: string) {
    const next = selectedGender === g ? null : g;
    setSelectedGender(next);
    updateParams({ gender: next });
  }

  function toggleType(t: string) {
    const next = selectedTypes.includes(t)
      ? selectedTypes.filter((x) => x !== t)
      : [...selectedTypes, t];
    setSelectedTypes(next);
    updateParams({ perfumeType: next });
  }

  function toggleAvailability(a: string) {
    const next = selectedAvailability.includes(a)
      ? selectedAvailability.filter((x) => x !== a)
      : [...selectedAvailability, a];
    setSelectedAvailability(next);
    updateParams({ availability: next });
  }

  function setRange(min: number, max: number) {
    setPriceRange([min, max]);
    updateParams({ price: `${min}-${max}` });
  }

  function updateParams(params: Record<string, string | string[] | null>) {
    const urlParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      urlParams.delete(key);
      if (Array.isArray(value)) {
        value.forEach((v) => urlParams.append(key, v));
      } else if (value) {
        urlParams.set(key, value);
      }
    });

    router.push(`/products?${urlParams.toString()}`);
  }

  function renderTag(
    label: string,
    active: boolean,
    onClick: () => void
  ) {
    return (
      <span
        onClick={onClick}
        className={`px-3 py-1.5 rounded-full border text-sm cursor-pointer ${
          active
            ? "bg-[#343A40] text-white border-[#343A40]"
            : "bg-gray-50 text-[#343A40] border-gray-200"
        }`}
      >
        {label}
      </span>
    );
  }

  return (
    <div className="lg:hidden">
      <button className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm font-semibold text-[#343A40] mb-3">
        فیلترها
      </button>

      <div className="space-y-4 bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
        <div>
          <h3 className="font-bold text-[#343A40] mb-2">برند</h3>
          <div className="flex flex-wrap gap-2">
            {brands.map((b) =>
              renderTag(b, selectedBrands.includes(b), () => toggleBrand(b))
            )}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[#343A40] mb-2">جنسیت</h3>
          <div className="flex gap-2 flex-wrap">
            {genders.map((g) =>
              renderTag(g, selectedGender === g, () => selectGender(g))
            )}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[#343A40] mb-2">نوع عطر</h3>
          <div className="flex gap-2 flex-wrap">
            {perfumeTypes.map((t) =>
              renderTag(t, selectedTypes.includes(t), () => toggleType(t))
            )}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[#343A40] mb-2">موجودی</h3>
          <div className="flex gap-2 flex-wrap">
            {availability.map((o) =>
              renderTag(o, selectedAvailability.includes(o), () =>
                toggleAvailability(o)
              )
            )}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[#343A40] mb-2">بازه قیمت</h3>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={1000000}
              step={50000}
              value={priceRange[0]}
              onChange={(e) => setRange(Number(e.target.value), priceRange[1])}
              className="w-full"
            />
            <input
              type="range"
              min={0}
              max={1000000}
              step={50000}
              value={priceRange[1]}
              onChange={(e) => setRange(priceRange[0], Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="text-xs text-gray-600 mt-2">
            {priceRange[0]} - {priceRange[1]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FiltersMobile;
