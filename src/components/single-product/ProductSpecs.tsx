"use client";
import React from "react";

interface ProductSpecsProps {
  gender: string;
  perfumeType: string;
  season: string;
  longevity: string;
  tone: string;
  scentFamily: string;
  sillage: string;
  perfumer: string[];
  translate: {
    season: (v: string) => string;
    longevity: (v: string) => string;
    sillage: (v: string) => string;
    tone: (v: string) => string;
    scentFamily: (v: string) => string;
  };
}

function ProductSpecs({
  gender,
  perfumeType,
  season,
  longevity,
  tone,
  scentFamily,
  sillage,
  perfumer,
  translate,
}: ProductSpecsProps) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-3xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">مشخصات محصول</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">جنسیت:</span>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                gender === "Unisex"
                  ? "bg-blue-50 text-blue-700 border-blue-300"
                  : gender === "Men"
                  ? "bg-cyan-50 text-cyan-700 border-cyan-300"
                  : "bg-pink-50 text-pink-700 border-pink-300"
              }`}
            >
              {gender === "Unisex"
                ? "یونی‌سکس"
                : gender === "Men"
                ? "مردانه"
                : "زنانه"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">نوع عطر:</span>
            <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-300">
              {perfumeType}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">فصل:</span>
            <span className="text-xs font-medium text-gray-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
              {translate.season(season)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">ماندگاری:</span>
            <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-300">
              {translate.longevity(longevity)}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">تن:</span>
            <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-300">
              {translate.tone(tone)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">خانواده رایحه:</span>
            <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-300">
              {translate.scentFamily(scentFamily)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">پخش:</span>
            <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-300">
              {translate.sillage(sillage)}
            </span>
          </div>
          {perfumer.length > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">عطار:</span>
              <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-300">
                {perfumer.join(", ")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductSpecs;
