import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

/* =========================
   🔤 FONTS
========================= */

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const fontHeading = DM_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

/* =========================
   📌 METADATA
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

  metadataBase: new URL("https://kitchendiaries.app"),

  openGraph: {
    title: "Kitchen Diaries",
    description:
      "Manage your restaurant smarter with billing, inventory, and analytics.",
    url: "https://kitchendiaries.app",
    siteName: "Kitchen Diaries",
    locale: "en_IN",
    type: "website",
  },
};

/* =========================
   🌙 THEME INIT (NO FLICKER)
========================= */

const themeScript = `
(function () {
  try {
    const stored = localStorage.getItem("theme");
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = stored || system;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } catch (e) {}
})();
`;

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
      className={`${fontSans.variable} ${fontMono.variable} ${fontHeading.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}