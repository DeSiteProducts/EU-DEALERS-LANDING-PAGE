import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeSite Products | Compact Portable Vibratory Screeners",
  description:
    "Explore DeSite Products compact portable vibratory screeners, built for contractors, landscapers and material producers across North America.",
  keywords: [
    "DeSite Products",
    "compact portable vibratory screeners",
    "portable screener",
    "soil screener",
    "gravel screener",
    "contractor equipment",
  ],
  openGraph: {
    title: "DeSite Products",
    description:
      "Compact portable vibratory screeners for contractors, landscapers, and material producers.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
