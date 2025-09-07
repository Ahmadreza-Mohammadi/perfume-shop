"use client";
import React from "react";
import { digitsEnToFa, formatPrice } from "../utils/helper";

interface Variant {
  volume: number;
  price: number;
  quantity: number;
}

interface ProductInfoProps {
  name: string;
  brand: string;
  discount: number;
  available: boolean;
  variants: Variant[];
  selectedVariantIndex: number;
  onVariantChange: (index: number) => void;
}

function ProductInfo({
  name,
  brand,
  discount,
  available,
  variants,
  selectedVariantIndex,
  onVariantChange,
}: ProductInfoProps) {
  const currentVariant = variants?.[selectedVariantIndex];
  return (
    <div className="w-full bg-white border border-gray-200 rounded-3xl shadow-lg p-6 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>
        <p className="text-base sm:text-lg text-gray-600 capitalize">{brand}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="text-2xl sm:text-3xl font-bold text-gray-900">
          {formatPrice(currentVariant?.price || 0)}
        </span>
        <span className="text-sm sm:text-base text-gray-500">تومان</span>
        {discount > 0 && (
          <span className="bg-red-100 text-red-800 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
            {discount}% تخفیف
          </span>
        )}
        {!available && (
          <span className="bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
            ناموجود
          </span>
        )}
      </div>

      <div className="space-y-3 w-full">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 text-center">
          انتخاب حجم
        </h3>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {variants?.map((variant, index) => (
            <button
              key={index}
              onClick={() => onVariantChange(index)}
              className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl border-2 transition-all duration-300 hover:shadow-md ${
                selectedVariantIndex === index
                  ? "border-gray-800 bg-gray-800 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }`}
            >
              <div className="text-center leading-tight">
                <div className="font-semibold text-xs sm:text-sm">
                  {digitsEnToFa(variant.volume)}ml
                </div>
                <div className="text-[10px] sm:text-xs mt-1">
                  {formatPrice(variant.price)} تومان
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
