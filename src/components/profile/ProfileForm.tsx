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
  initialAvatarUrl?: string;
  onSave: (payload: {
    fullName?: string;
    phone?: string;
    address?: string;
    avatarUrl?: string | null;
  }) => Promise<void> | void;
  userId: string; // Needed for building the storage file path
}

function ProfileForm({
  initialFullName = "",
  initialEmail = "",
  initialPhone = "",
  initialAddress = "",
  initialAvatarUrl = "",
  onSave,
  userId,
}: ProfileFormProps) {
  const [fullName, setFullName] = useState(initialFullName);
  const [phone, setPhone] = useState(initialPhone);
  const [address, setAddress] = useState(initialAddress);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(
    initialAvatarUrl || ""
  );
  const [removeAvatar, setRemoveAvatar] = useState<boolean>(false);
  const [saving, setSaving] = useState(false);
  const inputId = "avatar-input";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let avatarUrl: string | null | undefined;

      // If user chose to remove current avatar, clear metadata (and try deleting file)
      if (removeAvatar) {
        const supabase = getSupabase();
        try {
          const { data: files } = await supabase.storage
            .from("avatars")
            .list(userId);
          const targets = (files || [])
            .filter((f) => f.name.startsWith("avatar."))
            .map((f) => `${userId}/${f.name}`);
          if (targets.length > 0) {
            await supabase.storage.from("avatars").remove(targets);
          }
        } catch (_) {
          // Ignore storage delete errors; proceed to clear metadata
        }
        avatarUrl = null;
      } else if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const filePath = `${userId}/avatar.${fileExt}`;
        const supabase = getSupabase();
        const { error: uploadError } = await supabase.storage
          .from("avatars") // Private bucket name
          .upload(filePath, avatarFile, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) throw uploadError;

        // Get a signed URL for temporary access
        const { data, error: urlError } = await supabase.storage
          .from("avatars")
          .createSignedUrl(filePath, 60 * 60); // 1-hour link

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
        {/* Name and email */}
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

        {/* Phone and address */}
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

        {/* Avatar preview & controls */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            تصویر پروفایل
          </label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
              {avatarPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/profile.svg"
                  alt="no avatar"
                  className="w-10 h-10 opacity-40"
                />
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <label
                htmlFor={inputId}
                className="inline-flex items-center justify-center px-4 py-2 rounded-2xl border border-gray-300 bg-white text-gray-700 cursor-pointer hover:bg-gray-50"
              >
                انتخاب تصویر
              </label>
              <input
                id={inputId}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setAvatarFile(file);
                  setRemoveAvatar(false);
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setAvatarPreview(url);
                  }
                }}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => {
                  setAvatarFile(null);
                  setAvatarPreview("");
                  setRemoveAvatar(true);
                  const el = document.getElementById(
                    inputId
                  ) as HTMLInputElement | null;
                  if (el) el.value = "";
                }}
                className="inline-flex items-center justify-center px-4 py-2 rounded-2xl border border-red-200 text-red-600 bg-white hover:bg-red-50 cursor-pointer"
              >
                حذف تصویر
              </button>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-3 rounded-2xl bg-gray-900 text-white font-semibold cursor-pointer disabled:cursor-not-allowed"
          >
            {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </form>
    </ProfileCard>
  );
}

export default ProfileForm;
