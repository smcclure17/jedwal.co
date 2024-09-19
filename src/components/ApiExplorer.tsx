import { Patrick_Hand } from "next/font/google";
import { CodeBlock } from "./CodeBlock";
import { getApiData } from "@/data/fetching";
import { DeleteApiButton } from "./DeleteApiButton";
import { ApiCopyLink } from "./ApiCopyLink";
import Link from "next/link";

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

export interface ApiExplorerProps {
  apiName: string;
}

export const ApiExplorer = async ({ apiName }: ApiExplorerProps) => {
  const data = await getApiData(apiName);
  if (!data) return <>error</>;

  return (
    <div className="flex flex-col space-y-5 w-full">
      <div>
        <h2 className="text-2xl">/api/{apiName}</h2>
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
        <ApiCopyLink apiUrl={`${data.api_name}`} />
      </div>
      <div>
        <h3 className={`${patrick.className} text-xl`}>Use in code</h3>
        <CodeBlock apiName={data.api_name} />
      </div>
      <div>
        <h3 className={`${patrick.className} text-xl`}>Update Cadence</h3>
        <span>
          Refresh data every{" "}
          <b className="border p-0.5 px-1 cursor-default rounded-lg bg-gray-50">
            {data.cdn_ttl}
          </b>{" "}
          seconds.
        </span>
      </div>
      <div className="pt-2 pb-4">
        <DeleteApiButton apiName={apiName} />
      </div>
    </div>
  );
};
