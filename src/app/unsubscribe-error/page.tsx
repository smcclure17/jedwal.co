import { Metadata } from "next";
import { Patrick_Hand } from "next/font/google";
import Image from "next/image";

export interface LoadingScreenProps {}

const tenor = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Email Unsubscribe | Jedwal",
  description: "The page you're looking for doesn't exist.",
};

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-2 pb-64">
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
        Something went wrong with your subscription request.
      </h2>

      <div className="flex flex-col items-center">
        <p>
          Sorry, please try again later or email{" "}
          <a href="mailto:hello@jedwal.co">hello@jedwal.co</a> directly and
          we'll remove you.
        </p>
      </div>
    </div>
  );
}
