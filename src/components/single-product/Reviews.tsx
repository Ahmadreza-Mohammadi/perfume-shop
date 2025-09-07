"use client";
import React from "react";

interface ReviewsProps {
  rating?: number; // 0-5
  count?: number; // number of reviews
}

function Stars({ value = 0 }: { value?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {Array.from({ length: full }).map((_, i) => (
        <svg
          key={`f-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      {half && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
            fill="url(#half)"
          />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg
          key={`e-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#e5e7eb"
          className="w-5 h-5"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function Reviews({ rating = 4.5, count = 128 }: ReviewsProps) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-3xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Stars value={rating} />
          <span className="text-sm text-gray-600">{rating.toFixed(1)} / 5</span>
        </div>
        <button className="text-sm text-gray-700 hover:text-gray-900 underline-offset-4 hover:underline">
          مشاهده نظرات ({count})
        </button>
      </div>
    </div>
  );
}

export default Reviews;
