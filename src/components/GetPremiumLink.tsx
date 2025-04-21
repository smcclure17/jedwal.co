"use client";
import config from "@/config";

const handleClick = async () => {
  try {
    const response = await fetch(`${config.apiUrl}/create-checkout`, {
      method: "POST",
      credentials: "include",
    });
    const { url } = await response.json();
    window.location.href = url;
  } catch (e) {
    alert(e);
  }
};

export const GetPremiumLink = () => {
  return (
    <a
      className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-md text-sm px-3 py-1.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2 transition ease-in-out duration-300"
      href={`${config.homeUrl}/upgrade-to-pro`}
    >
      Upgrade to Pro
    </a>
  );
};

export const UpgradeButton = () => {
  return (
    <button
      onClick={handleClick}
      className="w-full bg-[#005430] text-white py-3 px-6 rounded-lg text-base font-medium cursor-pointer mt-10 transition-colors hover:opacity-80"
    >
      Upgrade Now
    </button>
  );
};
