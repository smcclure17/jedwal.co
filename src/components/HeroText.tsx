import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "600" });
const interLight = Inter({ subsets: ["latin"], weight: "400" });
const gradientText = `bg-gradient-to-r from-[#005430] to-[#8C8A8A] bg-clip-text text-transparent`;

export const HeroText = () => {
  return (
    <>
      <div className="flex flex-col mt-2">
        <div className="flex flex-row">
          <h1
            className={`font-bold pb-3 ${inter.className} ${gradientText} text-5xl sm:text-7xl`}
          >
            {/* Power your website with Google Sheets */}
            {/* The CMS your team already knows */}
            Google Drive as your CMS 
          </h1>
        </div>
        <h2 className={`${interLight.className} text-gray-600 font-ultralight text-sm sm:text-xl w-3/4 mx-auto`}>
          {/* Turn Google Sheets into JSON REST APIs instantly to save you time and money on developm                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ent. */}
          Publish website content directly from Google Docs and Sheets. Integrate instantly with Next.js or any
          modern framework.
        </h2>
      </div>
    </>
  );
};
