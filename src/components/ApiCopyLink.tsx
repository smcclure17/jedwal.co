import { CopyField } from "./CopyField";
import { getApiData } from "@/data/fetching";

export interface ApiCopyLinkProps {
  apiUrl: string;
}

export const ApiCopyLink = async ({ apiUrl }: ApiCopyLinkProps) => {
  const apiData = await getApiData(apiUrl);
  if (!apiData) return <>error</>;
  const { worksheets } = apiData;

  return (
    <CopyField
      text={`https://api.jedwal.co/api/${apiUrl}`}
      worksheets={worksheets}
    />
  );
};
