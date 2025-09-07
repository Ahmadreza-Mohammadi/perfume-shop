"use client";
import React from "react";
import Link from "next/link";

interface RelatedProduct {
  id: string | number;
  name: string;
  brand: string;
  image: string;
  price?: number;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;
  return (
    <div className="w-full bg-white border border-gray-200 rounded-3xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          محصولات مرتبط
        </h3>
        <div className="text-sm text-gray-600">{products.length} محصول</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p) => (
          <Link
            href={`/single-product/${p.id}`}
            key={p.id}
            className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow bg-white"
          >
            <div className="aspect-square w-full overflow-hidden bg-gray-50">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = "/perfume-bottle-heart.svg";
                }}
              />
            </div>
            <div className="p-3">
              <div className="text-xs text-gray-500 mb-1">{p.brand}</div>
              <div className="text-sm font-medium text-gray-800 line-clamp-1">
                {p.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
