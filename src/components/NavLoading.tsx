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

export const NavLoading = async () => {
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
    </nav>
  );
};
