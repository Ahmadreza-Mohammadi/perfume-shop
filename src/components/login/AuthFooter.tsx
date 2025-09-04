"use client";
import React from "react";
import Link from "next/link";

export default function AuthFooter() {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
        حساب کاربری ندارید؟{" "}
        <Link
          href="/register"
          className="font-medium text-gray-800 hover:text-gray-600"
        >
          ثبت نام کنید
        </Link>
      </p>
    </div>
  );
}
