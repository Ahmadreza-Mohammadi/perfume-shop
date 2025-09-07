"use client";
import React from "react";

interface ProfileCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

function ProfileCard({ title, children, className = "" }: ProfileCardProps) {
  return (
    <section
      className={`w-full bg-white border border-gray-200 rounded-3xl shadow-lg p-6 ${className}`}
    >
      {title ? (
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}

export default ProfileCard;
