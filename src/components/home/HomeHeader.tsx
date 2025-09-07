"use client";
import Image from "next/image";
import bellIcon from "../../../public/bell.svg";
import profile from "../../../public/profile.svg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSupabase } from "../../../lib/supabaseClient";
import ThemeToggle from "@/components/theme/ThemeToggle";
import ModalComponent from "../shared/ModalComponent";

function HomeHeader() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const supabase = getSupabase(); // ✅ داخل useEffect
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("❌ خطا در گرفتن کاربر:", error.message);
      } else if (data?.user) {
        setUser(data.user);
        setProfile(data.user.user_metadata);
        console.log(data.user.user_metadata)
      }
    };
    fetchUser();
  }, []);
  const handleLogout = async () => {
    const supabase = getSupabase();
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    setLogOut(false);
    router.replace("/login");
  };

  const handleAuthClick = () => {
    if (user) {
      setLogOut(true);
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <header className="w-full sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 py-3">
          <div className="flex justify-between items-center gap-3 sm:gap-4">
            {/* سمت راست */}
            <div className="flex items-center gap-2">
              <button
                className="group relative p-2.5 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-out shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300"
                aria-label="Notifications"
              >
                <Image
                  src={bellIcon}
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
                  alt="notifications"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3  rounded-full border-2 border-white animate-pulse"></div>
              </button>

              <button
                onClick={handleAuthClick}
                disabled={!!user && loading}
                className="group relative px-3 py-2 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-out shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 text-gray-700 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Logout"
                type="button"
              >
                {user ? (loading ? "در حال خروج..." : "خروج") : "ورود"}
              </button>
              {!user ? (
                <button
                  onClick={() => router.push("/register")}
                  className="group relative px-3 py-2 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-out shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 text-gray-700 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ثبت نام
                </button>
              ) : null}
            </div>

            {/* سمت چپ */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex flex-col items-end sm:items-start">
                <span className="text-sm sm:text-base text-gray-600 font-medium leading-tight">
                  خوش آمدید
                </span>
                <span className="text-base sm:text-lg font-extrabold text-[#343A40] leading-tight">
                  {user?.user_metadata?.fullName}
                </span>
              </div>

              <a
                href="/profile"
                className="group relative block"
                aria-label="Profile"
              >
                <div className="relative p-1 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-out shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300">
                  <Image
                    src={profile?.avatarUrl || "/profile.svg"}
                    width={48}
                    height={48}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-all duration-300 ease-out group-hover:scale-105 group-active:scale-95 shadow-sm"
                    alt="profile"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-[#343A40] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </header>

      {logOut && (
        <ModalComponent
          type="logout"
          handleWork={handleLogout}
          closeModal={() => setLogOut(false)}
        />
      )}
    </>
  );
}

export default HomeHeader;
