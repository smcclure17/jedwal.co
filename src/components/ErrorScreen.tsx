import { Patrick_Hand } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const tenor = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export const ErrorScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-2 pb-32">
      <Image
        src="/logo-cropped.svg"
        width={120}
        height={120}
        alt="Jedwal logo"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
        className="mb-4"
      />

      <h2 className={`text-2xl text-[#005430] text-center ${tenor.className}`}>
        Something's gone wrong.
      </h2>

      <div className="flex flex-col space-y-6 items-center">
        <span>Sorry! We'll iron this out as soon as we can.</span>
        <Link
          href="/"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Return to Home Page
        </Link>
      </div>
    </div>
  );
};
