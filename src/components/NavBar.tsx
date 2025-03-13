import { getUserData } from "@/data/fetching";
import { Bebas_Neue, Patrick_Hand } from "next/font/google";
import Link from "next/link";
import { GetPremiumLink } from "./GetPremiumLink";
import Image from "next/image";
import { UserMenu } from "./UserMenu";
import { NavBarNoUser } from "./NavLoading";

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

const DashBoardButton = () => {
  return (
    <Link
      href="https://app.jedwal.co"
      className="text-gray-900 bg-white focus:outline-hidden hover:bg-gray-100 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1 me-2 mb-2 border border-gray-300"
    >
      Dashboard
    </Link>
  );
};

export const NavBar = async ({ showDashboardButton }: NavBarProps) => {
  const userData = await getUserData();
  if (userData.status !== "logged_in") {
    return <NavBarNoUser showSignIn={userData.status === "logged_out"} />;
  }

  const { data } = userData;
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
        {data.account_status === "free" && (
          <GetPremiumLink email={data.email} />
        )}
        {showDashboardButton && <DashBoardButton />}
        <UserMenu orgs={data.orgs} user={data} />
      </div>
    </nav>
  );
};
