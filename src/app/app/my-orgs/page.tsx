import { NavBar } from "@/components/NavBar";

import { Patrick_Hand } from "next/font/google";
import { getUserData, getUserOrgs } from "@/data/fetching";
import config from "@/config";
import { UserOrgItem } from "@/components/UserOrgItem";
import Link from "next/link";

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export default async function CreateOrg() {
  const [userOrgs, user] = await Promise.all([getUserOrgs(), getUserData()]);
  const { userData, status } = user;

  // fix this stupid ass logic
  if (status === "logged_out" || userData === null || userOrgs === null) {
    return <a href={`${config.apiUrl}/login`}>login</a>;
  }

  return (
    <main className="flex justify-center">
      <div className={`flex flex-col sm:w-3/4 pt-4 sm:pr-`}>
        <NavBar />
        <div className="max-w-2xl mt-24">
          <h1 className={`${patrick.className} text-4xl text-[#005430]`}>
            My organizations
          </h1>
          <div className="mt-6">
            {userOrgs.length === 0 && (
              <div className="flex flex-row space-x-1">
                <span className="text-l">
                  You don't belong to any organizations.
                </span>
                <Link
                  href={`${config.dashUrl}/create-org`}
                  className="text-blue-500 hover:underline"
                >
                  Let's create one!
                </Link>
              </div>
            )}
            {userOrgs.map((org) => {
              return (
                // TODO: any "admin" should be able to delete an org. But
                // getUserOrgs doesn't tell us if a user is admin. We can
                // check if the user created the org. So, for now, only the
                // creator can delete the org.
                <UserOrgItem
                  org={org}
                  deletable={userData.id === org.created_by}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
