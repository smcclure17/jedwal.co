import { Card } from "@/components/Card";
import { CardHolder } from "@/components/CardHolder";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { HeroButton } from "@/components/HeroButton";
import { HeroText } from "@/components/HeroText";
import { LiteFooter } from "@/components/LiteFooter";
import { NavBar } from "@/components/NavBar";
import { NavLoading } from "@/components/NavLoading";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Jedwal | REST APIs from Google Sheets",
  description:
    "Use Google Sheets as a database to power your website with REST APIs from spreadsheets.",
  keywords: [
    "REST API Generator",
    "Spreadsheet to API",
    "Spreadsheet to Database",
    "No-code API creation",
    "Google Sheets integration",
    "Spreadsheet APIs",
    "Spreadsheet backend for apps",
    "Google Sheets app backend",
  ],
  openGraph: {
    url: "https://jedwal.co",
    type: "website",
    title: "Jedwal | REST APIs from Google Sheets",
    description:
      "Use Google Sheets as a database to power your website with REST APIs from spreadsheets.",
    images: [
      {
        url: "https://jedwal.co/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "jedwal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jedwal | REST APIs from Google Sheets",
    description:
      "Use Google Sheets as a database to power your website with REST APIs from spreadsheet",
    creator: "@seanmcclr",
    site: "@seanmcclr",
    images: [
      {
        url: "https://jedwal.co/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "jedwal",
      },
    ],
  },
  alternates: {
    canonical: "https://jedwal.co",
  },
};

export default function Home() {
  return (
    <main className="flex justify-center">
      <div className={`flex flex-col sm:w-3/4 pt-4 space-y-12`}>
        <div className="px-4 sm:px-0">
          <Suspense fallback={<NavLoading />}>
            <NavBar />
          </Suspense>
          <HeroText />
          <Suspense
            fallback={
              <div className="mt-4">
                <GoogleSignInButton />
              </div>
            }
          >
            <HeroButton />
          </Suspense>
        </div>
        <CardHolder>
          <Card
            title="Autoscaling"
            description="We scale as you grow, no need to worry about infrastructure."
          />
          <Card
            title="Near-Realtime Data"
            description="Choose how often to refresh your data, up to once a second"
          />
          <Card
            title="Analytics"
            badge="Beta!"
            description="Get insights into your API usage and data."
          />
        </CardHolder>
        <div className="flex flex-row justify-between mt-16">
          <Image
            src="/splash.png"
            width={16}
            height={9}
            className="object-cover"
            alt="demo"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>
        <LiteFooter />
      </div>
    </main>
  );
}
