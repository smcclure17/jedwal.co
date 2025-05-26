import { Patrick_Hand } from "next/font/google";
import { CodeBlock } from "./CodeBlock";
import { getAccountDocApis, getUserData } from "@/data/fetching";
import { DocApiCopyLink } from "./ApiCopyLink";
import Link from "next/link";
import { Suspense } from "react";
import { AnalyticsPreview } from "./AnalyticsPreview";
import { ApiExplorerNotFound } from "./ApiExplorerDefaultSelector";
import { NotLoggedInScreen } from "./NotLoggedInScreen";
import { ErrorScreen } from "./ErrorScreen";
import { DeleteDocApiButton } from "./DeleteDocApiButton";
import { DocApiPublishButton } from "./DocApiPublishButton";

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

export interface ApiExplorerProps {
  apiName: string;
  accountId: string;
}

export const DocApiExplorer = async ({
  accountId,
  apiName,
}: ApiExplorerProps) => {
  const [apisResponse, userResponse] = await Promise.all([
    getAccountDocApis(accountId),
    getUserData(accountId),
  ]);
  if (apisResponse.status === "error") return <ErrorScreen />;
  if (apisResponse.status === "logged_out") return <NotLoggedInScreen />;
  if (userResponse.status === "error") return <ErrorScreen />; // TODO: dedup this somehow
  if (userResponse.status === "logged_out") return <NotLoggedInScreen />;
  const { data: sheets } = apisResponse;

  const data = sheets.apis.find((sheet: any) => sheet.doc_api_name === apiName);
  if (!data) return <ApiExplorerNotFound />;

  return (
    <div className="flex flex-col space-y-5 w-full bg-white p-5 rounded-lg shadow-xs">
      <div>
        <h1 className="text-2xl font-medium">{data.title}</h1>
        <h2 className="text-xl">/doc/{data.doc_api_name}</h2>
        <Link
          href={`https://docs.google.com/document/d/${data.google_doc_id}`}
          target="_blank"
          className="text-blue-500 text-sm hover:underline"
        >
          View source Google Doc
        </Link>
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className={`${patrick.className} text-xl`}>
          Republish Post Content
        </h3>
        <DocApiPublishButton
          accountId={accountId}
          apiName={apiName}
        ></DocApiPublishButton>
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className={`${patrick.className} text-xl`}>
          Live Post Content URL
        </h3>
        <DocApiCopyLink apiUrl={data.doc_api_name} accountId={accountId} />
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className={`${patrick.className} text-xl`}>Analytics</h3>
        <Suspense fallback={<>loading...</>}>
          <AnalyticsPreview
            sheetApiId={data.doc_api_name}
            accountId={accountId}
          />
        </Suspense>
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className={`${patrick.className} text-xl`}>Use in code</h3>
        <CodeBlock apiName={data.doc_api_name} accountId={accountId} />
      </div>
      <div className="pt-2">
        <DeleteDocApiButton apiName={data.doc_api_name} accountId={accountId} />
      </div>
    </div>
  );
};
