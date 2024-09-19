import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "600" });
const gradientText = `bg-gradient-to-r from-[#005430] to-[#8C8A8A] bg-clip-text text-transparent`;

export const HeroText = () => {
  return (
    <>
      <div className="flex flex-col sm:mt-24 mt-16 md:w-[550px]">
        <div className="flex flex-row">
          <h1
            className={`font-bold pb-3 ${inter.className} ${gradientText} text-5xl sm:text-7xl`}
          >
            Power your website with Google Sheets
          </h1>
        </div>
        <h2 className="text-gray-600 sm:max-w-lg font-light text-md sm:text-2xl">
          Create REST APIs from Google Sheets in seconds to turn your
          spreadsheets into powerful databases.
        </h2>
      </div>
    </>
  );
};
