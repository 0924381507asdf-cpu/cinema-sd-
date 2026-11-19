
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "سينما SD | عالم الأفلام والمسلسلات",
  description: "منصة سينما SD لمشاهدة الأفلام والمسلسلات الأصلية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
