import Menu from "@/components/menu/Menu";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}
        <Menu />
      </body>
    </html>
  );
}
