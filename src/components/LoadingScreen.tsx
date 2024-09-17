import { Patrick_Hand } from "next/font/google";
import Image from "next/image";

export interface LoadingScreenProps {}

const tenor = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 pb-32">
      {/* TODO: Fix routing to static content (in /public/ from subdomain (app.domain.co)) */}
      <Image
        src="https://jedwal.co/logo-cropped.svg"
        width={150}
        height={150}
        alt="loading logo"
      />
      <h1 className={`text-3xl text-[#005430] ${tenor.className}`}>
        Loading<span className="ellipsis"></span>
      </h1>
    </div>
  );
};
