import { Patrick_Hand } from "next/font/google";
import { CodeBlock } from "./CodeBlock";
import { getAccountApis, getUserData } from "@/data/fetching";
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
  accountId: string;
}

export const ApiExplorer = async ({ accountId, apiName }: ApiExplorerProps) => {
  const [apisResponse, userResponse] = await Promise.all([
    getAccountApis(accountId),
    getUserData(accountId),
  ]);
  if (apisResponse.status === "error") return <ErrorScreen />;
  if (apisResponse.status === "logged_out") return <NotLoggedInScreen />;
  if (userResponse.status === "error") return <ErrorScreen />; // TODO: dedup this somehow
  if (userResponse.status === "logged_out") return <NotLoggedInScreen />;
  const { data: sheets } = apisResponse;
  const { data: userData } = userResponse;

  const data = sheets.find((sheet: any) => sheet.sheet_api_name === apiName);
  if (!data) return <ApiExplorerNotFound />;

  return (
    <div className="flex flex-col space-y-5 w-full bg-white p-5 rounded-lg shadow-xs">
      <div>
        <h1 className="text-2xl font-medium">{data.spreadsheet_title}</h1>
        <h2 className="text-xl">/api/{data.sheet_api_name}</h2>
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
          apiUrl={data.sheet_api_name}
          accountId={accountId}
          worksheets={data.worksheets}
        />
      </div>
      <div>
        <h3 className={`${patrick.className} text-xl`}>Use in code</h3>
        <CodeBlock apiName={data.sheet_api_name} accountId={accountId} />
      </div>
      <div>
        <h3 className={`${patrick.className} text-xl`}>Analytics</h3>
        <Suspense fallback={<>loading...</>}>
          <AnalyticsPreview
            sheetApiId={data.sheet_api_name}
            accountId={accountId}
          />
        </Suspense>
      </div>
      <div>
        <h3 className={`${patrick.className} text-xl`}>Update Cadence</h3>
        <CacheInput
          accountId={accountId}
          defaultTtl={data.cache_duration}
          name={data.sheet_api_name}
          isPremiumUser={userData.account_status === "premium"}
        />
      </div>
      <div className="pt-2">
        <DeleteApiButton apiName={data.sheet_api_name} accountId={accountId} />
      </div>
    </div>
  );
};
