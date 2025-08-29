"use client";
import React from "react";

type Props = {
  onOAuth: (provider: "google" | "facebook") => void;
};

export default function OAuthButtons({ onOAuth }: Props) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => onOAuth("google")}
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-sm shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-[#FAFAFA] transition-colors duration-200"
      >
        گوگل
      </button>
      <button
        type="button"
        onClick={() => onOAuth("facebook")}
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-sm shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-[#FAFAFA] transition-colors duration-200"
      >
        فیسبوک
      </button>
    </div>
  );
}
