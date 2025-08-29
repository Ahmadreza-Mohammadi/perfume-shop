"use client";
import React from "react";

export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="animate-pulse text-gray-700">در حال بارگذاری…</div>
    </div>
  );
}
