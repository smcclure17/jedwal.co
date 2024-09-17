"use client";
import { Patrick_Hand } from "next/font/google";
import Link from "next/link";

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

export interface PremiumApiCardProps {}

export const PremiumApiCard = ({}: PremiumApiCardProps) => {
  return (
    <Link
      href="#"
      target="_blank"
      className={`px-2 bg-green-100 rounded-md py-1 relative overflow-hidden bg-gradient-to-br hover:opacity-90 from-[#005430] to-[#57A773] transition ease-in-out`}
    >
      <div className="flex flex-col overflow-hidden">
        <h5
          className={`text-xl tracking-tight text-gray-800 ${patrick.className} text-white`}
        >
          Upgrade to create more APIs
        </h5>
        <p className="text-xs text-gray-100">
          Standard accounts are limited to 2 APIs. Upgrade to premium to create
          unlimited APIs.
        </p>
      </div>
    </Link>
  );
};
