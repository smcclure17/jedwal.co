import { Inter } from "next/font/google";
import { Patrick_Hand } from "next/font/google";

const pat = Patrick_Hand({weight: "400", subsets: ["latin"]})
const interLight = Inter({ subsets: ["latin"], weight: "400" });


export const HeroText = () => {
  return (
    <>
      <div className="flex flex-col mt-4 ">
        <div className="flex flex-row mx-auto ">
          <h1
            className={`font-bold pb-8  ${pat.className} text-[#005430] text-7xl px-10 max-w-2xl`}
          >
            Google Drive as your CMS
          </h1>
        </div>
        <h2 className={`${interLight.className} text-gray-800 font-ultralight text-lg sm:text-l w-3/4 mx-auto leading-tight`}>
          Publish posts from Google Docs and API data from Sheets. Integrate with Next.js or any
          modern framework.
        </h2>
      </div>
    </>
  );
};
