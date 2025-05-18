"use client";
import { useUserData } from "@/data/hooks";
import { GetPremiumLink } from "./GetPremiumLink";
import { UserMenu } from "./UserMenu";
import Link from "next/link";
import config from "@/config";

const DashBoardButton = () => {
  return (
    <Link
      href={`${config.dashUrl}`}
      className="hidden sm:inline-block text-gray-900 bg-white focus:outline-hidden hover:bg-gray-100 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1 me-2 mb-2 border border-gray-300 transition ease-in-out duration-100"
    >
      Dashboard
    </Link>
  );
};

export const NavBarUserSection = ({
  showDashboardButton,
  showUpgradeButton,
}: {
  showDashboardButton: boolean;
  showUpgradeButton: boolean;
}) => {
  const { data, error, isLoading } = useUserData();

  if (isLoading || error || !data) {
    return <div></div>;
  }

  return (
    <>
      {data.account_status === "free" && showUpgradeButton && (
        <GetPremiumLink />
      )}
      {showDashboardButton && <DashBoardButton />}
      <UserMenu orgs={data.orgs || []} user={data} />
    </>
  );
};
