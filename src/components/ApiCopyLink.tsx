import config from "@/config";
import { CopyField } from "./CopyField";
import { DocCopyField } from "./DocCopyField";

export interface ApiCopyLinkProps {
  apiUrl: string;
  accountId: string;
  worksheets?: string[];
}

export const ApiCopyLink = async ({
  accountId,
  apiUrl,
  worksheets = [],
}: ApiCopyLinkProps) => {
  return (
    <CopyField
      text={`https://api.jedwal.co/api/${accountId}/${apiUrl}`}
      worksheets={worksheets}
    />
  );
};

export const DocApiCopyLink = async ({
  accountId,
  apiUrl,
}: ApiCopyLinkProps) => {
  return <DocCopyField text={`${config.apiUrl}/doc/${accountId}/${apiUrl}`} />;
};
