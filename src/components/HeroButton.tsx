import { getUserData } from "@/data/fetching";
import { DashboardButton } from "./DashboardButton";
import { GoogleSignInButton } from "./GoogleSignInButton";

export interface HeroButtonProps {}

export const HeroButton = async () => {
  const { status } = await getUserData();

  return (
    <div className="flex flex-row space-x-4 mt-8 min-h-14">
      {status === "logged_in" && <DashboardButton />}
      {status === "logged_out" && <GoogleSignInButton />}
      {status === "loading" || (status === "error" && <></>)}
    </div>
  );
};
