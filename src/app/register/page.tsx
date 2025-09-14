"use client";

import { useEffect, useState } from "react";
import BackIcon from "@/components/shared/BackIcon";
import Link from "next/link";
import { getSupabase } from "../../lib/supabaseClient";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  // Redirect authenticated users away from register
  useEffect(() => {
    let isMounted = true;
    const check = async () => {
      const supabase = getSupabase();
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      if (data.session?.user) {
        router.replace("/home");
      } else {
        setCheckingAuth(false);
      }
    };
    check();

    const supabase = getSupabase();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          router.replace("/home");
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  const validateEmail = (email: string) => {
    const simpleEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return simpleEmailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const normalized = phone.replace(/\D/g, "");
    return normalized.length >= 10;
  };

  const validateField = (name: string, value: string | boolean) => {
    let message = "";
    switch (name) {
      case "fullName":
        if (!String(value).trim()) message = "نام و نام خانوادگی الزامی است";
        break;
      case "email":
        if (!String(value).trim()) message = "ایمیل الزامی است";
        else if (!validateEmail(String(value)))
          message = "فرمت ایمیل نامعتبر است";
        break;
      case "phone":
        if (!String(value).trim()) message = "شماره تلفن الزامی است";
        else if (!validatePhone(String(value)))
          message = "شماره تلفن نامعتبر است";
        break;
      case "password":
        if (!String(value)) message = "رمز عبور الزامی است";
        else if (String(value).length < 8)
          message = "رمز عبور باید حداقل ۸ کاراکتر باشد";
        break;
      case "confirmPassword":
        if (!String(value)) message = "تکرار رمز عبور الزامی است";
        else if (String(value) !== values.password)
          message = "رمز عبور و تکرار آن یکسان نیستند";
        break;
      case "terms":
        if (!Boolean(value)) message = "پذیرش قوانین الزامی است";
        break;
      default:
        break;
    }
    setFieldErrors((prev) => ({ ...prev, [name]: message || undefined }));
    return message === "";
  };

  const validateAll = () => {
    const validations: Array<[string, string | boolean]> = [
      ["fullName", values.fullName],
      ["email", values.email],
      ["phone", values.phone],
      ["password", values.password],
      ["confirmPassword", values.confirmPassword],
      ["terms", values.terms],
    ];
    let isValid = true;
    validations.forEach(([n, v]) => {
      const ok = validateField(n, v);
      if (!ok) isValid = false;
    });
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const nextValue = type === "checkbox" ? checked : value;
    setValues((prev) => ({ ...prev, [name]: nextValue }));
    validateField(name, nextValue);
    if (error) setError(null);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const isValid = validateAll();
    if (!isValid) return;

    setLoading(true);

    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          role: "customer",
          fullName: values.fullName,
          phone: values.phone,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      alert("ثبت‌نام موفق! لطفاً ایمیل خود را تأیید کنید.");
    }
  };

  if (checkingAuth) return null;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="m-auto sm:w-[420px] md:w-[640px] lg:w-[768px] xl:w-[1024px] flex flex-col min-h-screen">
        <BackIcon />

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            {/* Logo and title section */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-[#fff] rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                  <span className="text-gray-800 text-2xl font-bold">عطر</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">ثبت نام</h1>
              <p className="text-gray-600 text-sm">
                حساب کاربری جدید ایجاد کنید
              </p>
            </div>

            {/* Register form */}
            <div className="bg-[#fff] rounded-xl p-6 border border-gray-200">
              <form onSubmit={handleRegister} noValidate className="space-y-4">
                {/* Full Name field */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="نام و نام خانوادگی خود را وارد کنید"
                    className={`w-full px-4 py-3 border rounded-sm focus:outline-none bg-[#FAFAFA] text-right ${
                      fieldErrors.fullName
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-gray-400"
                    }`}
                    value={values.fullName}
                    onChange={handleChange}
                    required
                  />
                  {fieldErrors.fullName && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {fieldErrors.fullName}
                    </span>
                  )}
                </div>

                {/* Email field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    ایمیل
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ایمیل خود را وارد کنید"
                    className={`w-full px-4 py-3 border rounded-sm focus:outline-none bg-[#FAFAFA] text-right ${
                      fieldErrors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-gray-400"
                    }`}
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                  {fieldErrors.email && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {fieldErrors.email}
                    </span>
                  )}
                </div>

                {/* Phone field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    شماره تلفن
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="شماره تلفن خود را وارد کنید"
                    className={`w-full px-4 py-3 border rounded-sm focus:outline-none bg-[#FAFAFA] text-right ${
                      fieldErrors.phone
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-gray-400"
                    }`}
                    value={values.phone}
                    onChange={handleChange}
                    required
                  />
                  {fieldErrors.phone && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {fieldErrors.phone}
                    </span>
                  )}
                </div>

                {/* Password field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    رمز عبور
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="رمز عبور خود را وارد کنید"
                    className={`w-full px-4 py-3 border rounded-sm focus:outline-none bg-[#FAFAFA] text-right ${
                      fieldErrors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-gray-400"
                    }`}
                    value={values.password}
                    onChange={handleChange}
                    required
                  />
                  {fieldErrors.password && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {fieldErrors.password}
                    </span>
                  )}
                </div>

                {/* Confirm Password field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    تکرار رمز عبور
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="رمز عبور خود را دوباره وارد کنید"
                    className={`w-full px-4 py-3 border rounded-sm focus:outline-none bg-[#FAFAFA] text-right ${
                      fieldErrors.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-gray-400"
                    }`}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {fieldErrors.confirmPassword && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {fieldErrors.confirmPassword}
                    </span>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    checked={values.terms}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="mr-2 block text-sm text-gray-700"
                  >
                    با{" "}
                    <Link
                      href="/terms"
                      className="text-gray-800 hover:text-gray-600 transition-colors duration-200"
                    >
                      شرایط و قوانین
                    </Link>{" "}
                    موافقت می‌کنم
                  </label>
                </div>
                {fieldErrors.terms && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {fieldErrors.terms}
                  </span>
                )}

                {/* Error message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Sign up button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-800 text-white cursor-pointer py-3 px-4 rounded-sm font-medium hover:bg-gray-700 focus:outline-none transition-colors duration-200 mt-6 disabled:opacity-50"
                >
                  {loading ? "در حال ثبت‌نام..." : "ثبت نام"}
                </button>
              </form>

              {/* Social logins + footer همون قبلی */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
