"use client";
import config from "@/config";
import { useUserData } from "@/data/hooks";
import { Patrick_Hand } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export const AppLanding = () => {
  const { accountId } = useParams();
  const { data } = useUserData(accountId as string);

  const firstName = data?.display_name?.split(" ")[0] || "";

  return (
    <div
      className={`flex flex-col gap-2 mt-24 margin-auto w-full items-center text-center`}
    >
      <Image
        src="/logo-cropped.svg"
        height={120}
        width={120}
        alt="logo with stars"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      ></Image>
      <h1 className={`text-4xl ${patrick.className} text-[#005430]`}>
        Welcome{firstName && `, ${firstName}`}
      </h1>
      <h2 className="text-xl text-gray-800">Let's get started</h2>
      <Link
        href={`${config.dashUrl}/posts`}
        className={`text-blue-700 hover:underline`}
      >
        Posts
      </Link>
      <Link
        href={`${config.dashUrl}/apis`}
        className={`text-blue-700 hover:underline`}
      >
        APIs
      </Link>
    </div>
  );
};
