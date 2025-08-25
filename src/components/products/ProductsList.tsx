"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { supabase } from "../../../lib/supabaseClient";

// اضافه کردن totalCount به تایپ props
type ProductListProps = {
  initialPerfumes: any[];
  totalCount: number;
};

export default function ProductList({ initialPerfumes, totalCount }: ProductListProps) {
  const [perfumes, setPerfumes] = useState(initialPerfumes);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 12;

  const fetchMore = async () => {
    setLoading(true);

    const from = page * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .range(from, to);

    if (!error && data) {
      setPerfumes((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  };

  const allLoaded = perfumes.length >= totalCount;

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {perfumes.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {!allLoaded && (
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={fetchMore}
            disabled={loading}
            className="bg-gradient-to-r from-[#343A40] to-[#495057] text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg disabled:opacity-50"
          >
            {loading ? "در حال بارگذاری..." : "مشاهده بیشتر"}
          </button>
        </div>
      )}
    </section>
  );
}
