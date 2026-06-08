import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Anton } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpacePlus BKK — Bangkok's Premier Nightlife Experience",
  description:
    "SpacePlus BKK is Bangkok's most exclusive nightlife destination. World-class DJs, VIP tables, and unforgettable nights.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${anton.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#1c1c1c] text-[#f0ede8]">
        {children}
      </body>
    </html>
  );
}
