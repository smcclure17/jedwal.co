import { Bebas_Neue, Patrick_Hand } from "next/font/google";
import Link from "next/link";

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
        <span className={`${patrick.className} text-3xl text-[#005430]`}>
          Jedwal.
        </span>
        <span className={`${tenor.className} text-xl text-[#005430]`}>co</span>
      </Link>
      <div className="space-x-2">
        <Link
          href={`https://api.jedwal.co/login`}
          className={`text-sm font-medium text-gray-500 hover:text-gray-400 transition ease-in-out duration-200`}
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};
