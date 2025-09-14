"use client";
import Image from "next/image";
import React from "react";

interface ProfileHeaderProps {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

function ProfileHeader({ name = "کاربر", avatarUrl }: ProfileHeaderProps) {

  
  return (
    <div className="w-full bg-white border border-gray-200 rounded-3xl shadow-lg p-6 flex items-center gap-4">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
        <Image
          src={avatarUrl || "/profile.svg"}
          alt={name}
          width={80}
          height={80}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/profile.svg";
          }}
        />
      </div>
      <div className="flex-1">
        <div className="text-base sm:text-lg text-gray-600">پروفایل</div>
        <div className="text-lg sm:text-2xl font-bold text-gray-900">
          {name}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
