import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Zbukurohu – Makeup & Skincare Marketplace",
  description: "Frontend-only marketplace demo for the Balkans (Kosovo).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
