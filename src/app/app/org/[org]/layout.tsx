import { ApiCard } from "@/components/ApiCard";
import { CreateApiForm } from "@/components/CreateApiForm";
import { ErrorScreen } from "@/components/ErrorScreen";
import { MobileDashboardPlaceholder } from "@/components/MobileDashboardPlaceholder";
import { NavBar } from "@/components/NavBar";
import { NotLoggedInScreen } from "@/components/NotLoggedInScreen";
import { UserSheetsContainer } from "@/components/UserSheetsContainer";
import { getOrgSheets } from "@/data/fetching";
import React from "react";

// TODO: This should maybe just be a part of the page?
export default async function App({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ org: string }>;
}) {
  const { org } = await params;
  const orgSheets = await getOrgSheets(org);
  if (orgSheets.status === "error") return <ErrorScreen />;
  if (orgSheets.status === "logged_out") return <NotLoggedInScreen />;

  return (
    <>
      <div className="sm:hidden">
        <MobileDashboardPlaceholder />
      </div>
      <div className="bg-gray-100 min-h-screen">
        <main className="sm:block flex flex-col mx-auto px-10 pt-4">
          <NavBar showDashboardButton={false} />
          <div className="mt-10">
            <div className="p-5 bg-white rounded-lg shadow-xs">
              <CreateApiForm />
            </div>
            <div className="flex flex-row space-x-8 pt-8">
              <div>
                <UserSheetsContainer>
                  {orgSheets.data.map((sheet: any) => (
                    <ApiCard key={sheet.sheet_id} apiData={sheet} orgId={org} />
                  ))}
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
