import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { HeroButton } from "@/components/HeroButton";
import { HeroText } from "@/components/HeroText";
import { HomepageAlertWidget } from "@/components/HomepageAlertWidget";
import { LiteFooter } from "@/components/LiteFooter";
import { NavBar } from "@/components/NavBar";
import { NavBarNoUser } from "@/components/NavLoading";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PricingSection } from "@/components/sections/PricingSection";
import { UseCases } from "@/components/sections/UseCases";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], weight: "600" });

export const metadata: Metadata = {
  title: "Jedwal | The Google Drive-Powered CMS",
  description:
    "Publish website content directly from Google Drive. Convert Docs to CMS pages and Sheets to REST APIs with zero coding required. Integrate with NextJS, WordPress, or any modern framework.",
  keywords: [
    "Google Docs CMS",
    "Google Drive CMS",
    "No-code CMS",
    "Headless CMS",
    "Content management system",
    "Google Sheets API",
    "Docs to website",
    "Spreadsheet to API",
  ],
  openGraph: {
    url: "https://jedwal.co",
    type: "website",
    title: "Jedwal | The Google Drive-Powered CMS",
    description:
      "Publish content from Google Docs and Sheets. Turn Docs into CMS pages and Sheets into APIs — no code needed.",
    images: [
      {
        url: "https://jedwal.co/jedwal-og.png",
        width: 1200,
        height: 630,
        alt: "Jedwal - Google Drive powered CMS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jedwal | The Google Drive-Powered CMS",
    description:
      "Publish content from Google Docs and Sheets. Turn Docs into CMS pages and Sheets into APIs — no code needed.",
    creator: "@seanmcclr",
    site: "@seanmcclr",
    images: [
      {
        url: "https://jedwal.co/jedwal-og.png",
        width: 1200,
        height: 630,
        alt: "Jedwal - Google Drive powered CMS",
      },
    ],
  },
  alternates: {
    canonical: "https://jedwal.co",
  },
};

export default function Home() {
  return (
    <main className="flex justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="flex flex-col w-full max-w-7xl pt-4 space-y-12 px-4 lg:px-8">
        <div>
          <Suspense fallback={<NavBarNoUser showSignIn={false} />}>
            <NavBar showDashboardButton />
          </Suspense>
          <div className="md:mt-24 mt-16 max-w-3xl mx-auto text-center">
            <HomepageAlertWidget
              page="/blog/roadmap-and-release-notes"
              text="New post: Roadmap and Release Notes"
            />
            <HeroText />
            <Suspense
              fallback={
                <div className="mt-8 flex justify-center w-full">
                  <GoogleSignInButton />
                </div>
              }
            >
              <div className="mt-8 w-full">
                <HeroButton />
              </div>
            </Suspense>
          </div>
        </div>

        <section className="rounded-lg overflow-hidden shadow-md">
          <Image
            src="/demo-new.png"
            width={1200}
            height={675}
            className="w-full object-cover"
            alt="Jedwal dashboard preview"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </section>

        <section className={`${inter.className}`}>
          <HowItWorks />
          <FeaturesSection />
          <PricingSection />
          <UseCases />
        </section>

        <LiteFooter />
      </div>
    </main>
  );
}
