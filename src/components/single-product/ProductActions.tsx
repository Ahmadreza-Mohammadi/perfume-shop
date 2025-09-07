"use client";
import React from "react";
import { digitsEnToFa } from "../utils/helper";

interface ProductActionsProps {
  maxQuantity: number;
  quantity: number;
  available: boolean;
  onChangeQuantity: (newQuantity: number) => void;
  onAddToCart: () => void;
}

function ProductActions({
  maxQuantity,
  quantity,
  available,
  onChangeQuantity,
  onAddToCart,
}: ProductActionsProps) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-3xl shadow-lg p-6 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center border border-gray-300 rounded-2xl overflow-hidden">
          <button
            onClick={() => onChangeQuantity(quantity - 1)}
            disabled={quantity <= 1}
            className="px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            -
          </button>
          <span className="px-4 py-3 border-x border-gray-300 min-w-[60px] text-center bg-gray-50">
            {digitsEnToFa(quantity)}
          </span>
          <button
            onClick={() => onChangeQuantity(quantity + 1)}
            disabled={quantity >= maxQuantity}
            className="px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            +
          </button>
        </div>
        <span className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-full">
          موجود: {digitsEnToFa(maxQuantity)} عدد
        </span>
      </div>

      <button
        onClick={onAddToCart}
        disabled={!available || maxQuantity === 0}
        className="w-full bg-gray-900 text-white py-4 px-6 rounded-2xl font-semibold text-base sm:text-lg hover:bg-black hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {!available
          ? "ناموجود"
          : maxQuantity === 0
          ? "موجود نیست"
          : "افزودن به سبد خرید"}
      </button>
    </div>
  );
}

export default ProductActions;
