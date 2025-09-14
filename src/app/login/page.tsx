"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "../../lib/supabaseClient";
import { toast } from "react-toastify";
import AuthHeader from "@/components/login/AuthHeader";
import LoginForm from "@/components/login/LoginForm";
import OAuthButtons from "@/components/login/OAuthButtons";
import AuthFooter from "@/components/login/AuthFooter";
import AuthLoading from "@/components/login/AuthLoading";

function mapAuthErrorToMessage(msg: string) {
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials"))
    return "ایمیل یا رمز عبور اشتباه است.";
  if (m.includes("email not confirmed")) return "ایمیل شما تایید نشده است.";
  if (m.includes("invalid email")) return "فرمت ایمیل نامعتبر است.";
  if (m.includes("rate limit"))
    return "درخواست‌های متعدد. کمی بعد دوباره تلاش کنید.";
  return "ورود با مشکل مواجه شد. لطفاً دوباره تلاش کنید.";
}
export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const supabase = useMemo(() => getSupabase(), []);

  useEffect(() => {
    let isMounted = true;
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      if (data.session?.user) router.replace("/home");
      else setCheckingAuth(false);
    };
    check();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) router.replace("/home");
    });
    return () => subscription.unsubscribe();
  }, [router, supabase]);

  const handleLogin = async (
    email: string,
    password: string,
    remember: boolean
  ) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "auth:storage",
        remember ? "local" : "session"
      );
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) toast.error("ایمیل یا رمز عبور اشتباه است");
    else if (data.user) {
      toast.success("ورود با موفقیت انجام شد");
      router.replace("/home");
    }
  };

  const handleOAuth = async (provider: "google" | "facebook") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback`
            : undefined,
      },
    });
    if (error) alert(mapAuthErrorToMessage(error.message));
  };

  if (checkingAuth) return <AuthLoading />;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <AuthHeader />
        <LoginForm onLogin={handleLogin} loading={loading} />
        <OAuthButtons onOAuth={handleOAuth} />
        <AuthFooter />
      </div>
    </div>
  );
}
