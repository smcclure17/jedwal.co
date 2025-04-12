"use client";
import { useUserData, useUserDataWithOrgs } from "@/data/hooks";
import { GetPremiumLink } from "./GetPremiumLink";
import { UserMenu } from "./UserMenu";
import Link from "next/link";

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

export const NavBarUserSection = ({
  showDashboardButton,
}: {
  showDashboardButton: boolean;
}) => {
  const { data, error, isLoading } = useUserData();
  const { data: userWithOrgsData } = useUserDataWithOrgs();

  if (isLoading || error || !data) {
    return <div></div>;
  }

  return (
    <>
      {data.account_status === "free" && <GetPremiumLink email={data.email} />}
      {showDashboardButton && <DashBoardButton />}
      <UserMenu orgs={userWithOrgsData?.orgs || []} user={data} />
    </>
  );
};
