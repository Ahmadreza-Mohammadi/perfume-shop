import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-toastify/dist/ReactToastify.css";
import type { ReactNode } from "react";
import { vazirMatn } from "next-persian-fonts";
import { Inter } from "next/font/google";
import MenuWrapper from "@/components/menu/MenuWrapper";
import ToastProvider from "@/components/shared/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html dir="rtl" lang="fa" suppressHydrationWarning>
      <body className={`${vazirMatn.className} ${inter.className}`}>
        <ToastProvider />
        <div className="pb-20 md:pb-24">{children}</div>
        <MenuWrapper />
      </body>
    </html>
  );
}
