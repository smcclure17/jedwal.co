import { getUserData } from "@/data/fetching";
import { Bebas_Neue, Patrick_Hand } from "next/font/google";
import Link from "next/link";
import { GetPremiumLink } from "./GetPremiumLink";

const tenor = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

interface NavBarProps {
  mode?: "light" | "dark";
}

const DashBoardButton = () => {
  return (
    <Link
      href="https://app.jedwal.co"
      className="text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1 me-2 mb-2 border border-gray-300"
    >
      Dashboard
    </Link>
  );
};

export const NavBar = async ({ mode = "dark" }: NavBarProps) => {
  const { userData } = await getUserData();

  const SignButton = ({ name, mode }: { name: string; mode: string }) => {
    return (
      <Link
        href={`https://api.jedwal.co/${mode}`}
        className={`text-sm font-medium text-gray-500 hover:text-gray-400 transition ease-in-out duration-200`}
      >
        {name}
      </Link>
    );
  };

  return (
    <nav className="flex justify-between items-center">
      <Link href="/">
        <span className={`${patrick.className} text-3xl text-[#005430]`}>
          Jedwal.
        </span>
        <span className={`${tenor.className} text-xl text-[#005430]`}>co</span>
      </Link>

      <div className="space-x-2">
        {mode === "dark" && userData && <DashBoardButton />}
        {userData && !userData.premium && (
          <GetPremiumLink email={userData.email} />
        )}
        {!userData && <SignButton name="Sign In" mode="login" />}
        {userData && <SignButton name="Sign Out" mode="logout" />}
      </div>
    </nav>
  );
};
