import { Patrick_Hand } from "next/font/google";
import Image from "next/image";

export interface LoadingScreenProps {}

const tenor = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export const MobileDashboardPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 pb-32 overflow-hidden">
      {/* TODO: Fix routing to static content (in /public/ from subdomain (app.domain.co)) */}
      <h1 className={`text-3xl text-[#005430] ${tenor.className}`}>
        Sorry, we&apos;re not there yet :(
      </h1>
      <Image
        src="https://jedwal.co/logo-cropped.svg"
        width={150}
        height={150}
        alt="loading logo"
      />
      <h2 className="text-l text-gray-500 font-light text-center w-3/4">
        We&apos;re still working on the dashboard for mobile. In the meantime,
        please visit your dashboard on a desktop browser.
      </h2>
    </div>
  );
};
