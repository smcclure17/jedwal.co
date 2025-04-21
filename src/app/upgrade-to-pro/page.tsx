import { UpgradeButton } from "@/components/GetPremiumLink";
import { NavBar } from "@/components/NavBar";
import Head from "next/head";

export default function ExamplePage() {
  const gradientText = `bg-gradient-to-r from-[#005430] to-[#8C8A8A] bg-clip-text text-transparent`;

  return (
    <>
      <Head>
        <title>My NextJS Page</title>
        <meta name="description" content="A page with standard layout" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen">
        {/* Main content container with standard margins */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="mb-12">
            <NavBar showUpgradeButton={false} />
          </div>

          <div className="text-[#111827] leading-relaxed">
            <div className="max-w-5xl mx-auto px-6 py-16">
              <div className="text-center mb-12">
                <h1 className={`text-5xl font-bold pb-4 ${gradientText}`}>
                  Our pricing scales with you
                </h1>
                <p className="text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
                  Only pay when your data is actually refreshed. All other
                  requests are free — served instantly from cache.
                </p>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-10 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-4">Jedwal Pro</h2>
                  <p className="max-w-sm">Jedwal Pro gives you unlimited access to your APIs and ways to collaborate with your teams.</p>
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
                        className="w-5 h-5 text-[#005430] flex-shrink-0"
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
                        className="w-5 h-5 text-[#005430] flex-shrink-0"
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
                        $1 per every 10,000 extra data refreshes
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-[#005430] flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-base">Unlimited APIs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-[#005430] flex-shrink-0"
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

                <UpgradeButton />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
