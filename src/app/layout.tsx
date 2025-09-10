import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Layout } from "@/components/layout/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/components/ui/Toast";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export const metadata: Metadata = {
  title: {
    default: "Zbukurohu - Premium Beauty & Skincare Marketplace",
    template: "%s | Zbukurohu"
  },
  description: "Discover premium makeup, skincare, and beauty products from top brands. Shop authentic beauty essentials with fast delivery across the Balkans. Your trusted beauty destination.",
  keywords: ["beauty", "makeup", "skincare", "cosmetics", "Balkans", "e-commerce", "premium brands"],
  authors: [{ name: "Zbukurohu Team" }],
  creator: "Zbukurohu",
  publisher: "Zbukurohu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://zbukurohu.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zbukurohu.vercel.app',
    title: 'Zbukurohu - Premium Beauty & Skincare Marketplace',
    description: 'Discover premium makeup, skincare, and beauty products from top brands. Shop authentic beauty essentials with fast delivery across the Balkans.',
    siteName: 'Zbukurohu',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zbukurohu - Premium Beauty Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zbukurohu - Premium Beauty & Skincare Marketplace',
    description: 'Discover premium makeup, skincare, and beauty products from top brands.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ErrorBoundary>
          <AuthProvider>
            <ToastProvider>
              <Layout>{children}</Layout>
            </ToastProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
