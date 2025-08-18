"use client";

import ProductCard from "./ProductCard";
import TopBar from "./TopBar";
import FilterSidebar from "./FilterSidebar";
import FiltersMobile from "./FiltersMobile";
import Footer from "./ProductsFooter";
import { useState } from "react";
import { perfumes } from "../constants/ProductsData";


function Products() {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="min-h-screen w-full">
      <TopBar />

      <main className="max-w-7xl mx-auto px-4 py-6 lg:flex lg:items-start lg:gap-6 pb-24">
        <FilterSidebar />

        <section className="w-full lg:flex-1">
          <button
            className="lg:hidden w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm font-semibold text-[#343A40] active:scale-[0.99] transition"
            onClick={() => setShowFilters((v) => !v)}
          >
            {showFilters ? "پنهان کردن فیلترها" : "نمایش فیلترها"}
          </button>

          <div
            className={`lg:hidden transition-all duration-300 overflow-hidden ${
              showFilters
                ? "max-h-[1200px] opacity-100 mt-3"
                : "max-h-0 opacity-0"
            }`}
          >
            <FiltersMobile />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {perfumes.map((p) => (
              <ProductCard key={p.id} product={p as any} />
            ))}
          </div>

          <div className="flex justify-center items-center mt-8">
            <button className="bg-gradient-to-r from-[#343A40] to-[#495057] text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg">
              مشاهده بیشتر
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Products;
