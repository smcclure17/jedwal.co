"use client";
import config from "@/config";

export const GetPremiumLink = () => {
  return (
    <a
      className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-md text-sm px-3 py-1.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2 transition ease-in-out duration-300"
      href={`${config.homeUrl}/pricing`}
    >
      Upgrade to Pro
    </a>
  );
};

export const UpgradeButton = () => {
  return (
    <a
      href="https://app.jedwal.co/create-checkout"
      className="mx-auto text-center w-full bg-[#005430] text-white px-6 py-2 rounded-lg text-base font-medium transition-colors hover:opacity-80"
    >
      Upgrade Now
    </a>
  );
};
