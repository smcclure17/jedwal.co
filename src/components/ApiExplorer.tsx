import { Patrick_Hand } from "next/font/google";
import { CodeBlock } from "./CodeBlock";
import { getApiData } from "@/data/fetching";
import { CopyField } from "./CopyField";
import { DeleteApiButton } from "./DeleteApiButton";
import { ApiCopyLink } from "./ApiCopyLink";

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
    <div className="flex flex-col space-y-2">
      <h3 className={`${patrick.className} text-xl`}>Live API URL</h3>
      <ApiCopyLink apiUrl={`${data.api_name}`} />
      <h3 className={`${patrick.className} text-xl`}>Use in code</h3>
      <CodeBlock apiName={data.api_name} />
      <h3 className={`${patrick.className} text-xl`}>Update Cadence</h3>
      <span>
        Data will refresh every{" "}
        <b className="border p-0.5 px-1 cursor-default rounded-lg bg-gray-50">
          {data.cdn_ttl}
        </b>{" "}
        seconds.
      </span>
      <DeleteApiButton apiName={apiName} />
    </div>
  );
};
