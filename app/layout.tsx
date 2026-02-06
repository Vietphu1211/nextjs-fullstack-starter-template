import { Cabin } from 'next/font/google';
import "./globals.css";

import { FooterComponent } from '@/components/custom/footer/FooterComponent';
import HeaderComponent from '@/components/custom/header/HeaderComponent';
import ToastProvider from "@/lib/providers/ToastProvider";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SafeCard Đà Nẵng - Dịch vụ Tour & Car Rental',
  description: 'Khám phá Đà Nẵng với dịch vụ tour và thuê xe chuyên nghiệp. An toàn, tiện lợi, giá cả hợp lý.',
  keywords: 'tour Đà Nẵng, thuê xe Đà Nẵng, du lịch Đà Nẵng, SafeCard',
}

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["500"],
  style: "normal",
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cabin.className}>
      <body className="antialiased">
        <HeaderComponent />
        <ToastProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </ToastProvider>
        <FooterComponent />
      </body>
    </html>
  );
}
