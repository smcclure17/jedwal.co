import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jedwal.co"),
  openGraph: {
    siteName: "Jedwal | REST APIs from Google Sheets",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  applicationName: "Jedwal | REST APIs from Google Sheets",
  appleWebApp: {
    title: "Jedwal | REST APIs from Google Sheets",
    statusBarStyle: "default",
    capable: true,
  },
  // verification: {
  //   google: "YOUR_DATA",
  //   yandex: ["YOUR_DATA"],
  //   other: {
  //     "msvalidate.01": ["YOUR_DATA"],
  //     "facebook-domain-verification": ["YOUR_DATA"],
  //   },
  // },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      // add /favicon-16x16.png favicon-32x32.png, favicon-96x96.png, android-chrome-192x192.png with type: image/png
    ],
    shortcut: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
    // apple: [
    //   {
    //     url: "/apple-icon-57x57.png",
    //     sizes: "57x57",
    //     type: "image/png",
    //   },
    //   {
    //     url: "/apple-icon-60x60.png",
    //     sizes: "60x60",
    //     type: "image/png",
    //   },
    // add apple-icon-72x72.png, apple-icon-76x76.png, apple-icon-114x114.png, apple-icon-120x120.png, apple-icon-144x144.png, apple-icon-152x152.png, apple-icon-180x180.png
    // ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
