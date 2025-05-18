import { getUserData } from "@/data/fetching";
import { Bebas_Neue, Patrick_Hand } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { NavBarNoUser } from "./NavLoading";
import { NavBarUserSection } from "./NavBarUserSection";

const tenor = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

interface NavBarProps {
  showDashboardButton?: boolean;
  showUpgradeButton?: boolean;
}

export const NavBar = async ({
  showDashboardButton = true,
  showUpgradeButton = true,
}: NavBarProps) => {
  const userData = await getUserData();
  if (userData.status !== "logged_in") {
    return <NavBarNoUser showSignIn={userData.status === "logged_out"} />;
  }

  return (
    <nav className="flex justify-between">
      <LogoLink />
      <div className="space-x-2">
        <NavBarUserSection
          showDashboardButton={showDashboardButton}
          showUpgradeButton={showUpgradeButton}
        />
      </div>
    </nav>
  );
};

export const LogoLink = ({
  size = "default",
}: {
  size?: "default" | "small";
}) => {
  const height = size === "default" ? 30 : 20;
  const width = height;
  const textSize = size === "default" ? "3xl" : "2xl";
  const dotCoSize = size === "default" ? "xl" : "lg";

  return (
    <Link href="/">
      <div className="flex flex-row space-x-1">
        <Image
          src="/logo-cropped.svg"
          height={height}
          width={width}
          alt="logo with stars"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        ></Image>
        <div className="items-center">
          <span
            className={`${patrick.className} text-${textSize} text-[#005430]`}
          >
            Jedwal.
          </span>
          <span
            className={`${tenor.className} text-${dotCoSize} text-[#005430]`}
          >
            co
          </span>
        </div>
      </div>
    </Link>
  );
};
