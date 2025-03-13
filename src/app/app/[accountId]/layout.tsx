import { ApiCard } from "@/components/ApiCard";
import { BetaDisclaimerBanner } from "@/components/BetaDisclaimerBanner";
import { CreateApiForm } from "@/components/CreateApiForm";
import { ErrorScreen } from "@/components/ErrorScreen";
import { FirstApiSplash } from "@/components/FirstApiSplash";
import { MobileDashboardPlaceholder } from "@/components/MobileDashboardPlaceholder";
import { NavBar } from "@/components/NavBar";
import { NotLoggedInScreen } from "@/components/NotLoggedInScreen";
import { PremiumApiCard } from "@/components/PremiumApiCard";
import { UserSheetsContainer } from "@/components/UserSheetsContainer";
import { getUserData, getAccountApis } from "@/data/fetching";
import React from "react";

export default async function App({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ accountId: string }>;
}) {
  const { accountId } = await params;

  const [userResponse, apisResponse] = await Promise.all([
    getUserData(accountId),
    getAccountApis(accountId),
  ]);

  // TODO: dedup these somehow
  if (userResponse.status === "logged_out") return <NotLoggedInScreen />;
  if (userResponse.status === "error") return <ErrorScreen />;
  if (apisResponse.status === "logged_out") return <NotLoggedInScreen />;
  if (apisResponse.status === "error") return <ErrorScreen />;

  const { data } = userResponse;
  const { data: sheets } = apisResponse;

  if (sheets.length == 0) {
    return (
      <main className="sm:block flex flex-col mx-auto sm:w-3/4 px-4 pt-4">
        <NavBar showDashboardButton={false} />
        <FirstApiSplash accountId={accountId} />
      </main>
    );
  }

  const disableCreate = data.account_status === "free" && sheets.length >= 2;
  const isOrganization = data.type === "organization";
  return (
    <>
      <div className="sm:hidden">
        <MobileDashboardPlaceholder />
      </div>
      <div className="bg-gray-100 min-h-screen">
        <main className="sm:block flex flex-col mx-auto px-10 pt-4">
          <NavBar showDashboardButton={false} />
          <div className="mt-10">
            {isOrganization && <BetaDisclaimerBanner />}
            <div className="p-5 bg-white rounded-lg shadow-xs">
              <CreateApiForm disabled={disableCreate} accountId={accountId} />
            </div>
            <div className="flex flex-row space-x-8 pt-8">
              <div>
                <UserSheetsContainer>
                  {sheets.map((sheet: any) => (
                    <ApiCard
                      key={sheet.sheet_api_name}
                      apiData={sheet}
                      accountId={accountId}
                    />
                  ))}
                  {disableCreate && !isOrganization && (
                    <PremiumApiCard email={data.email} />
                  )}
                </UserSheetsContainer>
              </div>
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
