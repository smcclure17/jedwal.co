import { BetaDisclaimerBanner } from "@/components/BetaDisclaimerBanner";
import { ErrorScreen } from "@/components/ErrorScreen";
import { MobileDashboardPlaceholder } from "@/components/MobileDashboardPlaceholder";
import { NotLoggedInScreen } from "@/components/NotLoggedInScreen";
import { getUserData, getAccountDocApis } from "@/data/fetching";
import React from "react";
import { Metadata } from "next";

import { FilterableUserSheets } from "@/components/UserSheetsContainer";
import { DashboardHeader } from "@/components/DashboardHeader";
import { CreateApiForm } from "@/components/CreateApiForm";
import { FirstDocSplash } from "@/components/FirstDocSplash";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ accountId: string }>;
}): Promise<Metadata> {
  try {
    const { accountId } = await params;
    const userResponse = await getUserData(accountId);

    if (userResponse.status === "logged_in" && userResponse.data) {
      return {
        title: `Jedwal — ${userResponse.data.display_name}`,
      };
    }

    return {
      title: "Jedwal Dashboard",
    };
  } catch (error) {
    return {
      title: "Jedwal Dashboard",
    };
  }
}

export default async function App({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ accountId: string; post?: string }>;
}) {
  const { accountId, post } = await params;

  const [userResponse, apisResponse] = await Promise.all([
    getUserData(accountId),
    getAccountDocApis(accountId),
  ]);

  // TODO: dedup these somehow
  if (userResponse.status === "logged_out") return <NotLoggedInScreen />;
  if (userResponse.status === "error") return <ErrorScreen />;
  if (apisResponse.status === "logged_out") return <NotLoggedInScreen />;
  if (apisResponse.status === "error") return <ErrorScreen />;

  const { data } = userResponse;
  const { data: sheets } = apisResponse;
  const { apis } = sheets;

  if (apis.length == 0) {
    return (
      <>
        <DashboardHeader
          contentType="APIs"
          displayName={data.display_name}
          className="white"
        ></DashboardHeader>

        <main className="sm:block flex flex-col mx-auto sm:w-3/4 px-4 pt-4">
          <FirstDocSplash accountId={accountId} />
        </main>
      </>
    );
  }
  console.log()

  const totalSheets = apis.length;
  const disableCreate = data.account_status === "free" && totalSheets >= 2;
  const isOrganization = data.type === "organization";

  return (
    <>
      <div className="sm:hidden">
        <MobileDashboardPlaceholder />
      </div>
      <DashboardHeader
        contentType="Posts"
        displayName={data.display_name}
      ></DashboardHeader>
      <div className="bg-gray-100 min-h-screen">
        <main className="sm:block flex flex-col mx-auto px-10 pt-4">
          <div>
            {isOrganization && <BetaDisclaimerBanner />}
            <div className="p-5 bg-white rounded-lg shadow-xs">
              <CreateApiForm
                type="doc"
                disabled={disableCreate}
                accountId={accountId}
              />
            </div>
            <div className="flex flex-row space-x-8 pt-8">
              <div>
                <FilterableUserSheets
                  apis={apis}
                  accountId={accountId}
                  disableCreate={disableCreate}
                />
              </div>
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
