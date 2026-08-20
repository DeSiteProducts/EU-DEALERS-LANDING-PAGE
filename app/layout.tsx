import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const gaId = "G-6QFTHC9PX3";
export const metadata: Metadata = {
  verification: {
    google: "ac_m3RaMCVz-JEeX3OuNK8liLoEPfLmOSt4-AyO7NQw",
  },
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
      <body>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
         {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "y5i2lchm0b");
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}