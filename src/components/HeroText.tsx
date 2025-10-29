import { Inter } from "next/font/google";
import { Patrick_Hand } from "next/font/google";

const pat = Patrick_Hand({weight: "400", subsets: ["latin"]})
const interLight = Inter({ subsets: ["latin"], weight: "400" });
const gradientText = `bg-linear-to-r from-[#005430] to-[#8C8A8A] bg-clip-text text-transparent`;



export const HeroText = () => {
  return (
    <>
      <div className="flex flex-col mt-2">
        <div className="flex flex-row mx-auto">
          <h1
            className={`font-bold pb-10 ${pat.className} ${gradientText} text-5xl sm:text-8xl px-10`}
          >
            {/* Power your website with Google Sheets */}
            {/* The CMS your team already knows */}
            Google Drive as your CMS
          </h1>
        </div>
        <h2 className={`${interLight.className} text-gray-800 font-ultralight text-sm sm:text-xl w-3/4 mx-auto`}>
          {/* Turn Google Sheets into JSON REST APIs instantly to save you time and money on developm                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ent. */}
          Publish website content from Google Docs and Sheets. Integrate with Next.js or any
          modern framework.
        </h2>
      </div>
    </>
  );
};
