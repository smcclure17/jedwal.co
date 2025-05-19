import { Inter } from "next/font/google";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const interLight = Inter({ subsets: ["latin"], weight: "400" });

const apiSteps = [
  {
    title: "Connect your Google Sheet",
    text: "Paste your Google Sheet URL to create an API, no code required.",
  },
  {
    title: "Get your API endpoint",
    text: "We generate a unique REST API that you can call from any application.",
  },
  {
    title: "Build with live data",
    text: "Your API data refreshes based on your specified update cadence.",
  },
];

const postSteps = [
  {
    title: "Connect your Google Doc",
    text: "Paste your Google Document URL to create a new post.",
  },
  {
    title: "Get your Post endpoint",
    text: "We generate a unique content link to integrate with your frontend.",
  },
  {
    title: "Build with live data",
    text: "Refresh your post at any point to pull in your latest changes.",
  },
];

export const HowItWorks = () => {
  return (
    <>
      <section className="py-20 px-6 max-w-5xl mx-auto rounded-2xl bg-gradient-to-br from-[#005430]/85 to-[#005430]/60">
        <h2 className="text-4xl font-bold text-white text-center mb-8 gradient-text">
          How It Works
        </h2>
        <Tabs defaultValue="apis" className="flex flex-col">
          <TabsList className="w-fit mx-auto mb-6">
            <TabsTrigger value="apis">APIs (Google Sheets)</TabsTrigger>
            <TabsTrigger value="posts">Posts (Google Docs)</TabsTrigger>
          </TabsList>

          <TabsContent value="apis">
            <h3
              className={`${interLight.className} text-white mx-auto text-center mb-10 max-w-3xl`}
            >
              Convert a Google Sheet into a REST API. Great for feeding live
              data to graphics, or for building custom components.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {apiSteps.map((item, idx) => {
                return (
                  <div key={idx}>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 text-[#005430] font-bold text-xl shadow-md">
                        {idx + 1}
                      </div>
                      <h4 className="text-xl font-semibold mb-3 text-white">
                        {item.title}
                      </h4>
                      <p className="text-gray-200">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="posts">
            <h3
              className={`${interLight.className} text-white text-center mx-auto mb-10 max-w-3xl`}
            >
              Create a CMS post from a Google Doc, preserving your formatting,
              structure, and images. Great for blog posts or any content-driven
              pages.
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {postSteps.map((item, idx) => {
                return (
                  <div key={idx}>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 text-[#005430] font-bold text-xl shadow-md">
                        {idx + 1}
                      </div>
                      <h4 className="text-xl font-semibold mb-3 text-white">
                        {item.title}
                      </h4>
                      <p className="text-gray-200">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        <div className="gradient-border mx-auto max-w-4xl">
          <div className="gradient-border-content p-8 shadow-md">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-gray-200 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              <h3 className="text-xl font-semibold text-white">
                Lightning-fast delivery
              </h3>
            </div>
            <p className="text-gray-200 mb-6">
              Every request is served through a global CDN. Cached requests are
              instant, and you only pay when your data is actually refreshed.
            </p>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 text-green-800 text-xs font-semibold rounded-full py-1 px-3 mr-3 mt-1">
                  CACHED
                </div>
                <div>
                  <h4 className="font-semibold mb-1">CDN-cached requests</h4>
                  <p className="text-gray-600 text-sm">
                    Served instantly from a global edge network.{" "}
                    <span className="font-medium text-green-600">
                      Always free
                    </span>
                    , unlimited usage.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 text-xs font-semibold rounded-full py-1 px-3 mr-3 mt-1">
                  REFRESH
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Data refresh requests</h4>
                  <p className="text-gray-600 text-sm">
                    Data fetched directly from Google Drive.{" "}
                    <span className="font-medium">5,000 free/month</span>, then
                    usage-based pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
