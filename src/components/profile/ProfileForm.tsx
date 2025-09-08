"use client";
import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import { toast } from "react-toastify";
import { getSupabase } from "../../lib/supabaseClient";

interface ProfileFormProps {
  initialFullName?: string;
  initialEmail?: string;
  initialPhone?: string;
  initialAddress?: string;
  onSave: (payload: {
    fullName?: string;
    phone?: string;
    address?: string;
    avatarUrl?: string;
  }) => Promise<void> | void;
  userId: string; // اضافه می‌کنیم برای مسیر فایل
}

function ProfileForm({
  initialFullName = "",
  initialEmail = "",
  initialPhone = "",
  initialAddress = "",
  onSave,
  userId,
}: ProfileFormProps) {
  const [fullName, setFullName] = useState(initialFullName);
  const [phone, setPhone] = useState(initialPhone);
  const [address, setAddress] = useState(initialAddress);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let avatarUrl: string | undefined;

      // اگر کاربر فایل انتخاب کرده بود، آپلود کن
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const filePath = `${userId}/avatar.${fileExt}`;
        const supabase = getSupabase();
        const { error: uploadError } = await supabase.storage
          .from("avatars") // اسم باکت پرایوت
          .upload(filePath, avatarFile, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) throw uploadError;

        // گرفتن signed url
        const { data, error: urlError } = await supabase.storage
          .from("avatars")
          .createSignedUrl(filePath, 60 * 60); // لینک یک ساعته

        if (urlError) throw urlError;

        avatarUrl = data.signedUrl;
      }

      await Promise.resolve(onSave({ fullName, phone, address, avatarUrl }));
      toast.success("تغییرات با موفقیت ذخیره شد");
    } catch (error: any) {
      toast.error(error?.message || "خطا در ذخیره تغییرات");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProfileCard title="اطلاعات کاربر">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
        {/* نام و ایمیل */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="نام کامل خود را وارد کنید"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">ایمیل</label>
            <input
              type="email"
              value={initialEmail}
              disabled
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3"
            />
          </div>
        </div>

        {/* موبایل و آدرس */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              شماره موبایل
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="شماره موبایل"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">آدرس</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="آدرس محل سکونت"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3"
            />
          </div>
        </div>

        {/* آپلود تصویر */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            تصویر پروفایل
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            className="block w-full cursor-pointer rounded-2xl border border-gray-300 bg-white px-4 py-2.5"
          />
        </div>

        {/* دکمه ذخیره */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-3 rounded-2xl bg-gray-900 text-white font-semibold"
          >
            {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </form>
    </ProfileCard>
  );
}

export default ProfileForm;
