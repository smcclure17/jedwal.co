"use client";

import { Bebas_Neue, Patrick_Hand } from "next/font/google";
import Link from "next/link";
import { GetPremiumLink } from "./GetPremiumLink";
import Image from "next/image";
import { UserMenu } from "./UserMenu";
import { NavBarNoUser } from "./NavLoading";
import { useUserData, useUserOrgs } from "@/data/hooks";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import config from "@/config";

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
      className="text-gray-900 bg-white focus:outline-hidden hover:bg-gray-100 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1 me-2 mb-2 border border-gray-300 transition ease-in-out duration-100"
    >
      Dashboard
    </Link>
  );
};

// Server-side version maintained for fallback/compatibility
export const NavBarServer = async ({ showDashboardButton }: NavBarProps) => {
  // Import this dynamically to avoid client-side imports of server components
  const { getUserData } = await import("@/data/fetching");
  const userData = await getUserData();
  if (userData.status !== "logged_in") {
    return <NavBarNoUserServer showSignIn={userData.status === "logged_out"} />;
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

// This is needed since we're making NavBarNoUser a client component now
const NavBarNoUserServer = ({ showSignIn }: { showSignIn: boolean }) => {
  // Import server config
  
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

// Client-side version with React Query
export const NavBar = ({ showDashboardButton }: NavBarProps) => {
  const userDataQuery = useUserData();
  const userOrgsQuery = useUserOrgs();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Short timeout to prevent loading flicker on fast connections
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show minimal loading state during initial data fetch
  if (isLoading && (userDataQuery.isLoading || userOrgsQuery.isLoading)) {
    return (
      <nav className="flex justify-between">
        <Logo />
        <div className="p-2">
          <LoadingSpinner size="sm" />
        </div>
      </nav>
    );
  }
  
  // Handle error or logged out states
  if (userDataQuery.isError || userDataQuery.data?.status !== "logged_in") {
    return <NavBarNoUser showSignIn={userDataQuery.data?.status === "logged_out"} />;
  }
  
  const userData = userDataQuery.data.data;
  const orgs = userOrgsQuery.data?.status === "logged_in" ? userOrgsQuery.data.data : [];
  
  return (
    <nav className="flex justify-between">
      <Logo />
      <div className="space-x-2">
        {userData.account_status === "free" && (
          <GetPremiumLink email={userData.email} />
        )}
        {showDashboardButton && <DashBoardButton />}
        <UserMenu orgs={orgs} user={userData} />
      </div>
    </nav>
  );
};

// Extract Logo component to reduce duplication
const Logo = () => (
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
);
