import { UpgradeButton } from "@/components/GetPremiumLink";
import { NavBarNoUser } from "@/components/NavLoading";
import { PricingEstimator } from "@/components/PricingEstimator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jedwal Pro Pricing | Simple, Usage-Based Billing",
  description:
    "Jedwal Pro offers transparent usage-based pricing with a $10/month base fee plus $1 per 10,000 data refreshes. First 5,000 refreshes free each month.",
  keywords: [
    "REST API Pricing",
    "Jedwal Pro subscription",
    "Spreadsheet to API pricing",
    "Google Sheets API pricing",
    "Usage-based pricing",
    "Google Sheets integration cost",
    "Spreadsheet backend pricing",
  ],
  openGraph: {
    url: "https://jedwal.co/pricing",
    type: "website",
    title: "Jedwal Pro | Simple Usage-Based Pricing",
    description:
      "Transparent pricing for Jedwal Pro: $10/month base with first 5,000 data refreshes free. Pay only when your data refreshes - cached requests are always free.",
    images: [
      {
        url: "https://jedwal.co/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Jedwal Pro Pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jedwal Pro | Simple Usage-Based Pricing",
    description:
      "Transparent pricing for Jedwal Pro: $10/month base with first 5,000 data refreshes free. Pay only when your data refreshes - cached requests are always free.",
    creator: "@seanmcclr",
    site: "@seanmcclr",
    images: [
      {
        url: "https://jedwal.co/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Jedwal Pro Pricing",
      },
    ],
  },
  alternates: {
    canonical: "https://jedwal.co/pricing",
  },
};

export default function BillingPage() {
  const gradientText = `bg-linear-to-r from-[#005430] to-[#8C8A8A] bg-clip-text text-transparent`;

  return (
    <main className="min-h-screen">
      {/* Main content container with standard margins */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-12">
          <NavBarNoUser showSignIn={false} />
        </div>

        <div className="text-[#111827] leading-relaxed">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h1 className={`text-5xl font-bold pb-4 text-[#005430]`}>
                Transparent, Cheap, Usage-based Pricing
              </h1>
              <p className="text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
                Only pay when your data is actually refreshed. All other
                requests are free — served instantly from cache.
              </p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-10 shadow-xs flex flex-col space-y-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-4">Jedwal Pro</h2>
                  <p className="max-w-sm">
                    Jedwal Pro gives you unlimited access to your APIs and ways
                    to collaborate with your teams.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[#4B5563] mb-1">
                    Pay as you go
                  </div>
                  <div className="text-4xl font-bold mb-1">$10</div>
                  <div className="text-sm text-[#4B5563] uppercase">USD</div>
                </div>
              </div>

              <div className="mt-10">
                <div className="text-sm font-semibold text-[#005430] mb-6">
                  What's included
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[#005430] shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base">
                      5,000 free data refreshes/month
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[#005430] shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base">
                      $1 per every10,000 extra data refreshes
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[#005430] shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base">Unlimited posts and APIs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[#005430] shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base">Create organizations</span>
                  </div>
                </div>
              </div>
              <div className="w-full border flex items-center">
                <UpgradeButton />
              </div>
            </div>
            <PricingEstimator />
          </div>
        </div>
      </div>
    </main>
  );
}
