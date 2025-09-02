"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import { getSupabase } from "../../../lib/supabaseClient";

type ProductWithId = Product & { id: string | number };

type ProductListProps = {
  initialPerfumes: ProductWithId[];
  totalCount: number;
};

export default function ProductList({
  initialPerfumes,
  totalCount,
}: ProductListProps) {
  const supabase = getSupabase();
  const [perfumes, setPerfumes] = useState<ProductWithId[]>(initialPerfumes);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const limit = 12;

  const fetchMore = async () => {
    if (loading) return;
    setLoading(true);

    const from = page * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (!error && data) {
      setPerfumes((prev) => {
        const merged = [...prev, ...(data as ProductWithId[])];
        const unique = merged.filter(
          (p, idx, self) => idx === self.findIndex((x) => x.id === p.id)
        );
        return unique;
      });
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  };

  const allLoaded = perfumes.length >= totalCount;

  useEffect(() => {
    if (allLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [allLoaded, page]);

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
        {perfumes.map((p, idx) => (
          <ProductCard key={String(p.id) ?? `perfume-${idx}`} product={p} />
        ))}
      </div>

      {!allLoaded && (
        <div
          ref={loadMoreRef}
          className="flex justify-center items-center mt-8"
        >
          {loading && (
            <div className="flex flex-row gap-2 py-16">
              <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:.7s]"></div>
              <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:.7s]"></div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
