import { ApiCard } from "@/components/ApiCard";
import { CreateApiForm } from "@/components/CreateApiForm";
import { FirstApiSplash } from "@/components/FirstApiSplash";
import { MobileDashboardPlaceholder } from "@/components/MobileDashboardPlaceholder";
import { NavBar } from "@/components/NavBar";
import { PremiumApiCard } from "@/components/PremiumApiCard";
import { UserSheetsContainer } from "@/components/UserSheetsContainer";
import config from "@/config";
import { getUserData, getUserSheets } from "@/data/fetching";
import React from "react";

// TODO: This should maybe just be a part of the page?
export default async function App({ children }: { children: React.ReactNode }) {
  const [userSheets, user] = await Promise.all([
    getUserSheets(),
    getUserData(),
  ]);
  const { userData } = user;

  if (userSheets === null) {
    return <a href={`${config.apiUrl}/login`}>Please login to continue</a>;
  }
  if (userData === null) {
    return <a href={`${config.apiUrl}/login`}>Please login to continue</a>;
  }

  if (userSheets.length === 0) {
    return (
      <main className="sm:block flex flex-col mx-auto sm:w-3/4 px-4 pt-4">
        <NavBar mode="light" />
        <FirstApiSplash />
      </main>
    );
  }

  const disableCreate = !userData.premium && userSheets.length >= 2;
  return (
    <>
      <div className="sm:hidden">
        <MobileDashboardPlaceholder />
      </div>
      <main className="sm:block flex flex-col mx-auto sm:w-3/4 px-4 pt-4">
        <NavBar mode="light" />
        <div className="mt-10">
          <CreateApiForm disabled={disableCreate} />
          <div className="flex flex-row space-x-12 pt-16">
            <div>
              <UserSheetsContainer>
                {userSheets.map((sheet) => (
                  <ApiCard key={sheet.sheet_id} apiData={sheet} />
                ))}
                {!userData?.premium && userData?.api_count == 2 && (
                  <PremiumApiCard />
                )}
              </UserSheetsContainer>
            </div>
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
