import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Zbukurohu - Frontend E-commerce Marketplace",
  description: "Frontend-only e-commerce marketplace for makeup and skincare in the Balkans.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
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
