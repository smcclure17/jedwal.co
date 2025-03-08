import { Patrick_Hand } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { GoogleSignInButton } from "./GoogleSignInButton";

export interface NotLoggedInScreenProps {
  message?: string;
}

const tenor = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export const NotLoggedInScreen = ({
  message = "You need to sign in to access this page",
}: NotLoggedInScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 pb-32">
      <Image
        src="/logo-cropped.svg"
        width={120}
        height={120}
        alt="Jedwal logo"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />

      <h2 className={`text-2xl text-[#005430] text-center ${tenor.className}`}>
        {message}
      </h2>

      <div className="flex flex-col space-y-4 items-center">
        <GoogleSignInButton />
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
