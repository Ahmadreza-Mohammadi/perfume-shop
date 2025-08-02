import "./globals.css"
import type { ReactNode } from "react"
import Menu from "@/components/menu/Menu"
import ThemeProvider from "@/components/theme/ThemeProvider"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <Menu />
        </ThemeProvider>
      </body>
    </html>
  )
}
