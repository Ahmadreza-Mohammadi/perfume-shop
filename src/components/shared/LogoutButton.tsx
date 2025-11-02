"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSupabase } from "../../lib/supabaseClient";
import ModalComponent from "./ModalComponent";

export default function LogoutButton() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [logOut, setLogOut] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("❌ خطا در گرفتن کاربر:", error.message);
      } else if (data?.user) {
        setUser(data.user);
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
      <button
        onClick={handleAuthClick}
        disabled={!!user && loading}
        className="group relative px-3 py-2 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-out shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 text-gray-700 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Logout"
        type="button"
      >
        {user ? (loading ? "در حال خروج..." : "خروج") : "ورود"}
      </button>

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
