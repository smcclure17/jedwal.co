import { Patrick_Hand } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

export interface LoadingScreenProps {}

const tenor = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

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
        Under Construction.
      </h2>

      <div className="flex flex-col items-center">
        <p>
          Okay, you caught us! We haven't built the blog homepage, yet...
        </p>
        <p>
          For now, why don't you check out our{" "}
          <Link
            href="/blog/roadmap-and-release-notes"
            className="font-medium text-blue-600 hover:text-gray-900 transition-colors"
          >
            Release Notes and Roadmap post?
          </Link>
        </p>
      </div>
    </div>
  );
}
