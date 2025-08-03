import "./globals.css";
import type { ReactNode } from "react";
import Menu from "@/components/menu/Menu";
import ThemeProvider from "@/components/theme/ThemeProvider";
import { vazirMatn } from "next-persian-fonts";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html dir="rtl" lang="fa" suppressHydrationWarning>
      <body className={`${vazirMatn.className} ${inter.className}`}>
        <ThemeProvider>
          {children}
          <Menu />
        </ThemeProvider>
      </body>
    </html>
  );
}
