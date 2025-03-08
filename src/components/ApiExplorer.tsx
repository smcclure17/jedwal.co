import { Patrick_Hand } from "next/font/google";
import { CodeBlock } from "./CodeBlock";
import { getOrgSheets, getUserDataWithSheets } from "@/data/fetching";
import { DeleteApiButton } from "./DeleteApiButton";
import { ApiCopyLink } from "./ApiCopyLink";
import Link from "next/link";
import { Suspense } from "react";
import { AnalyticsPreview } from "./AnalyticsPreview";
import { ApiExplorerNotFound } from "./ApiExplorerDefaultSelector";
import { CacheInput } from "./CacheInput";
import { NotLoggedInScreen } from "./NotLoggedInScreen";
import { ErrorScreen } from "./ErrorScreen";

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

export interface ApiExplorerProps {
  apiName: string;
}

export interface DashboardApiExplorerProps {
  apiName: string;
  org: string;
}

export const ApiExplorer = async ({ apiName }: ApiExplorerProps) => {
  const userWithSheets = await getUserDataWithSheets();
  if (userWithSheets.status === "error") return <ErrorScreen />;
  if (userWithSheets.status === "logged_out") return <NotLoggedInScreen />;
  const { userData, sheets } = userWithSheets.data;

  const data = sheets.find((sheet) => sheet.api_name === apiName);
  if (!data) return <ApiExplorerNotFound />;

  return (
    <div className="flex flex-col space-y-5 w-full bg-white p-5 rounded-lg shadow-xs">
      <div>
        <h1 className="text-2xl font-medium">{data.spreadsheet_name}</h1>
        <h2 className="text-xl">/api/{data.api_name_formatted}</h2>
        <Link
          href={`https://docs.google.com/spreadsheets/d/${data.sheet_id}`}
          target="_blank"
          className="text-blue-500 text-sm hover:underline"
        >
          View source Google Sheet
        </Link>
      </div>
      <div>
        <h3 className={`${patrick.className} text-xl`}>Live API URL</h3>
        <ApiCopyLink
          apiUrl={data.api_name_formatted}
          worksheets={data.worksheets}
        />
      </div>
      <div>
        <h3 className={`${patrick.className} text-xl`}>Use in code</h3>
        <CodeBlock apiName={data.api_name_formatted} />
      </div>
      <div>
        <h3 className={`${patrick.className} text-xl`}>Analytics</h3>
        <Suspense fallback={<>loading...</>}>
          <AnalyticsPreview apiName={apiName} />
        </Suspense>
      </div>
      <div>
        <h3 className={`${patrick.className} text-xl`}>Update Cadence</h3>
        <CacheInput
          defaultTtl={data.cdn_ttl}
          name={data.api_name}
          isPremiumUser={userData.premium}
        />
      </div>
      <div className="pt-2">
        <DeleteApiButton apiName={data.api_name} />
      </div>
    </div>
  );
};

export const OrganizationsApiExplorer = async ({
  apiName,
  org,
}: DashboardApiExplorerProps) => {
  const orgSheets = await getOrgSheets(org);
  if (orgSheets.status === "error") return <ErrorScreen />;
  if (orgSheets.status === "logged_out") return <NotLoggedInScreen />;

  const data = orgSheets.data.find((sheet: any) => sheet.api_name === apiName);
  if (!data) return <ApiExplorerNotFound />;

  return (
    <div className="flex flex-col space-y-5 w-full bg-white p-5 rounded-lg shadow-xs">
      <div>
        <h1 className="text-2xl font-medium">{data.spreadsheet_name}</h1>
        <h2 className="text-xl">/api/{data.api_name_formatted}</h2>
        <Link
          href={`https://docs.google.com/spreadsheets/d/${data.sheet_id}`}
          target="_blank"
          className="text-blue-500 text-sm hover:underline"
        >
          View source Google Sheet
        </Link>
      </div>
      <div>
        <h3 className={`${patrick.className} text-xl`}>Live API URL</h3>
        <ApiCopyLink
          apiUrl={data.api_name_formatted}
          worksheets={data.worksheets}
        />
      </div>
      <div>
        <h3 className={`${patrick.className} text-xl`}>Use in code</h3>
        <CodeBlock apiName={data.api_name_formatted} />
      </div>
      <div>
        <h3 className={`${patrick.className} text-xl`}>Analytics</h3>
        <Suspense fallback={<>loading...</>}>
          <AnalyticsPreview apiName={apiName} />
        </Suspense>
      </div>
      <div>
        <h3 className={`${patrick.className} text-xl`}>Update Cadence</h3>
        <CacheInput
          defaultTtl={data.cdn_ttl}
          name={data.api_name}
          isPremiumUser={true}
        />
      </div>
      <div className="pt-2">
        <DeleteApiButton apiName={data.api_name} />
      </div>
    </div>
  );
};
