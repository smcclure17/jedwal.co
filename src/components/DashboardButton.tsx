import Link from "next/link";
import { Patrick_Hand } from "next/font/google";
import config from "@/config";

const pat = Patrick_Hand({weight: "400", subsets: ["latin"]})

export function DashboardButton() {
  return (
    <Link
      href={`${config.dashUrl}`}
      className={`${pat.className} text-gray-900 bg-green-100 focus:outline-hidden hover:bg-green-200 focus:bg-gray-100 focus:ring-2 focus:ring-gray-400 font-medium rounded-full text-2xl px-3 py-1 me-2 mb-2 w-60 text-center border-2 border-gray-900 h-11 transition ease-in-out duration-200 shadow-lg`}
    >
      Go to your dashboard
    </Link>
  );
}
