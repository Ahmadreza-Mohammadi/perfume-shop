"use client";
import React, { useState } from "react";

type Props = {
  onLogin: (email: string, password: string, remember: boolean) => void;
  loading: boolean;
};

export default function LoginForm({ onLogin, loading }: Props) {
  const [values, setValues] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateField = (name: string, value: string) => {
    if (name === "email") {
      if (!value.trim()) return "ایمیل الزامی است";
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!regex.test(value)) return "فرمت ایمیل نامعتبر است";
    }
    if (name === "password") {
      if (!value) return "رمز عبور الزامی است";
      if (value.length < 6) return "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const nextValue = type === "checkbox" ? checked : value;
    setValues(prev => ({ ...prev, [name]: nextValue }));
    setErrors(prev => ({ ...prev, [name]: type === "checkbox" ? undefined : validateField(name, value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateField("email", values.email);
    const passwordError = validateField("password", values.password);
    setErrors({ email: emailError, password: passwordError });
    if (!emailError && !passwordError) {
      onLogin(values.email, values.password, values.remember);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="ایمیل خود را وارد کنید"
          className={`w-full px-4 py-3 border rounded-sm focus:outline-none bg-[#FAFAFA] text-right ${
            errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-400"
          }`}
        />
        {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="رمز عبور خود را وارد کنید"
          className={`w-full px-4 py-3 border rounded-sm focus:outline-none bg-[#FAFAFA] text-right ${
            errors.password ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-400"
          }`}
        />
        {errors.password && <span className="text-red-500 text-sm mt-1 block">{errors.password}</span>}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center text-sm text-gray-700">
          <input type="checkbox" name="remember" checked={values.remember} onChange={handleChange} className="h-4 w-4 text-gray-600 border-gray-300 rounded mr-2" />
          مرا به خاطر بسپار
        </label>
        <a href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-800">فراموشی رمز؟</a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-800 text-white py-3 px-4 rounded-sm font-medium hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
      >
        {loading ? "در حال ورود..." : "ورود"}
      </button>
    </form>
  );
}
