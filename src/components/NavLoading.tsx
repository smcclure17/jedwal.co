"use client";

import { Bebas_Neue, Patrick_Hand } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import config from "@/config";

const tenor = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export const NavBarNoUser = ({ showSignIn }: { showSignIn: boolean }) => {
  return (
    <nav className="flex justify-between items-center">
      <Link href="/">
        <div className="flex flex-row space-x-1">
          <Image
            src="/logo-cropped.svg"
            height={30}
            width={30}
            alt="logo with stars"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          ></Image>
          <div className="items-center">
            <span className={`${patrick.className} text-3xl text-[#005430]`}>
              Jedwal.
            </span>
            <span className={`${tenor.className} text-xl text-[#005430]`}>
              co
            </span>
          </div>
        </div>
      </Link>
      {showSignIn && (
        <div className="space-x-2">
          <Link
            href={`${config.apiUrl}/login`}
            className={`text-sm font-medium text-gray-500 hover:text-gray-400 transition ease-in-out duration-200`}
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};
