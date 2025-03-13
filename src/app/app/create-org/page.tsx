import { NavBar } from "@/components/NavBar";

import { Patrick_Hand } from "next/font/google";
import { getUserData } from "@/data/fetching";
import config from "@/config";
import { OrganizationForm } from "@/components/OrganizationForm";
import { ErrorScreen } from "@/components/ErrorScreen";
import { NotLoggedInScreen } from "@/components/NotLoggedInScreen";

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export default async function CreateOrg() {
  const userResult = await getUserData();
  if (userResult.status === "logged_out") return <NotLoggedInScreen />;
  if (userResult.status === "error") return <ErrorScreen />;

  if (userResult.data.account_status === "free") {
    return (
      <main className="flex justify-center">
        <div className={`flex flex-col sm:w-3/4 pt-4 sm:pr-`}>
          <NavBar />
          <div className="max-w-2xl mt-24">
            <h1 className={`${patrick.className} text-4xl text-gray-500`}>
              Sorry, you must have premium to create an organization :(
            </h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex justify-center">
      <div className={`flex flex-col sm:w-3/4 pt-4 sm:pr-`}>
        <NavBar />
        <div className="max-w-2xl mt-24">
          <h1 className={`${patrick.className} text-4xl text-[#005430]`}>
            Create a new organization
          </h1>
          <div className="mt-6">
            <OrganizationForm />
          </div>
        </div>
      </div>
    </main>
  );
}
