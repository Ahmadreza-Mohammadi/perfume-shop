"use client";
import React from "react";

export default function AuthHeader() {
  return (
    <div className="text-center mb-8">
      <div className="mb-6">
        <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
          <span className="text-gray-800 text-2xl font-bold">عطر</span>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">خوش آمدید</h1>
      <p className="text-gray-600 text-sm">
        برای ادامه وارد حساب کاربری خود شوید
      </p>
    </div>
  );
}
