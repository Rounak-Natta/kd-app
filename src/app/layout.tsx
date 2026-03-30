import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

/* =========================
   📌 METADATA (SEO READY)
========================= */

export const metadata: Metadata = {
  title: {
    default: "Kitchen Diaries",
    template: "%s | Kitchen Diaries",
  },
  description:
    "Kitchen Diaries is a smart restaurant management SaaS for billing, inventory, analytics, and operations.",

  applicationName: "Kitchen Diaries",

  keywords: [
    "restaurant management",
    "pos system",
    "inventory management",
    "billing software",
    "kitchen software",
  ],

  authors: [{ name: "Kitchen Diaries Team" }],

  creator: "Kitchen Diaries",

  openGraph: {
    title: "Kitchen Diaries",
    description:
      "Manage your restaurant smarter with billing, inventory, and analytics.",
    url: "https://kitchendiaries.app",
    siteName: "Kitchen Diaries",
    locale: "en_IN",
    type: "website",
  },

  metadataBase: new URL("https://kitchendiaries.app"),
};

/* =========================
   🧱 ROOT LAYOUT
========================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}