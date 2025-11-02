"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import { getSupabase } from "../../lib/supabaseClient";

type ProductWithId = any;

type ProductListProps = {
  initialPerfumes: ProductWithId[];
  totalCount: number;
  filters?: any;
};

export default function ProductList({
  initialPerfumes,
  filters = {},
  totalCount,
}: ProductListProps) {
  const supabase = getSupabase();
  const [perfumes, setPerfumes] = useState<ProductWithId[]>(initialPerfumes);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isFetchingRef = useRef<boolean>(false);

  const limit = 12;

  useEffect(() => {
    setPerfumes(initialPerfumes);
    setPage(1);
    isFetchingRef.current = false;
  }, [initialPerfumes]);

  const fetchMore = useCallback(async () => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setLoading(true);

    setPage((currentPage) => {
      const from = currentPage * limit;
      const to = from + limit - 1;

      let query = supabase
        .from("products")
        .select(
          `
          *,
          product_variants (
            id,
            volume,
            price
          )
        `,
          { count: "exact" }
        )
        .order("created_at", { ascending: false })
        .range(from, to);

      const { brand, gender, perfumeType, price } = filters || {};

      if (brand) {
        if (Array.isArray(brand)) query = query.in("brand", brand);
        else if (brand.includes(","))
          query = query.in("brand", brand.split(","));
        else query = query.eq("brand", brand);
      }

      if (gender) {
        if (gender.includes(",")) query = query.in("gender", gender.split(","));
        else query = query.eq("gender", gender);
      }

      if (perfumeType) {
        if (Array.isArray(perfumeType))
          query = query.in("perfumeType", perfumeType);
        else query = query.eq("perfumeType", perfumeType);
      }

      if (price) {
        const [min, max] = price.split("-").map(Number);
        if (!isNaN(min)) query = query.gte("price", min);
        if (!isNaN(max)) query = query.lte("price", max);
      }

      query.then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setPerfumes((prev) => {
            const merged = [...prev, ...(data as ProductWithId[])];
            const unique = merged.filter(
              (p, idx, self) => idx === self.findIndex((x) => x.id === p.id)
            );
            return unique;
          });
        }
        setLoading(false);
        isFetchingRef.current = false;
      });

      return currentPage + 1;
    });
  }, [filters, supabase, limit]);

  const allLoaded = perfumes.length >= totalCount;

  // Check if filters are applied
  const hasFilters =
    filters &&
    (filters.brand || filters.gender || filters.perfumeType || filters.price);

  // Check if no products found with filters applied
  const noProductsFound =
    hasFilters && perfumes.length === 0 && !loading && !isFetchingRef.current;

  useEffect(() => {
    if (allLoaded) return;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingRef.current && !allLoaded) {
          fetchMore();
        }
      },
      { threshold: 0.5 }
    );

    observerRef.current = observer;

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [allLoaded, fetchMore]);

  // Show "no products found" message when filters are applied but no results
  if (noProductsFound) {
    return (
      <section className="w-full">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-gray-700 text-xl font-semibold mb-4">
            محصولی یافت نشد
          </div>
          <div className="text-gray-500 text-center max-w-md">
            متأسفانه با فیلترهای انتخاب شده محصولی یافت نشد.
            <br />
            لطفاً فیلترهای خود را تغییر دهید و دوباره تلاش کنید.
          </div>
        </div>
      </section>
    );
  }

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
