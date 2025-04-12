import { getUserData } from "@/data/fetching";
import { Bebas_Neue, Patrick_Hand } from "next/font/google";
import Link from "next/link";
import { GetPremiumLink } from "./GetPremiumLink";
import Image from "next/image";
import { UserMenu } from "./UserMenu";
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
}

export const NavBar = async ({ showDashboardButton = true }: NavBarProps) => {
  const userData = await getUserData();
  if (userData.status !== "logged_in") {
    return <NavBarNoUser showSignIn={userData.status === "logged_out"} />;
  }

  return (
    <nav className="flex justify-between">
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
      <div className="space-x-2">
        <NavBarUserSection showDashboardButton={showDashboardButton}/>
      </div>
    </nav>
  );
};
