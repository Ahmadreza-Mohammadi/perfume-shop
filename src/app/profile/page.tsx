"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "../../../lib/supabaseClient";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileForm from "@/components/profile/ProfileForm";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabase();
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("❌ Error fetching user:", error.message);
        router.replace("/login");
        return;
      }

      if (data?.user) {
        setUser(data.user);
        setLoading(false);
        return;
      }

      router.replace("/login");
    };

    fetchUser();
  }, []);
  if (loading)
    return <div className="max-w-[1440px] mx-auto p-6">در حال بارگذاری...</div>;
  if (!user) return null;

  return (
    <div className="max-w-[1440px] mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <ProfileHeader
            name={user?.user_metadata?.fullName || "کاربر"}
            email={user?.email}
            avatarUrl={user?.user_metadata?.avatarUrl}
          />
          <div className="mt-6">
            <ProfileCard title="اطلاعات حساب">
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">ایمیل</span>
                  <span className="font-medium">{user?.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">شناسه کاربر</span>
                  <span className="font-mono text-xs text-gray-500">
                    {user?.id}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">آدرس</span>
                <span>{user?.user_metadata?.address}</span>
                </div>
              </div>
            </ProfileCard>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-6">
          <ProfileForm
            initialFullName={user?.user_metadata?.fullName || ""}
            initialEmail={user?.email || ""}
            initialPhone={user?.user_metadata?.phone || ""}
            initialAddress={user?.user_metadata?.address || ""}
            userId={user?.id}
            onSave={async ({ fullName, phone, address, avatarUrl }) => {
              const supabase = getSupabase();
              const updates: any = {
                data: {
                  ...user?.user_metadata,
                  ...(fullName ? { fullName } : {}),
                  ...(phone ? { phone } : {}),
                  ...(address ? { address } : {}),
                  ...(avatarUrl ? { avatarUrl } : {}),
                },
              };
              const { error } = await supabase.auth.updateUser(updates);
              if (error) throw error;
              const { data } = await supabase.auth.getUser();
              setUser(data.user);
            }}
          />
        </div>
      </div>
    </div>
  );
}
