"use client";
import { getSupabase } from "@/lib/supabaseClient";
import React, { useEffect, useState } from "react";

interface ProfileCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

function ProfileCard({ title, children, className = "" }: ProfileCardProps) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => {
    const supabase = getSupabase();
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("❌ خطا در گرفتن کاربر:", error.message);
      } else if (data?.user) {
        setUser(data.user);
        setProfile(data.user.user_metadata);
      }
    };
    fetchUser();
  }, []);

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
