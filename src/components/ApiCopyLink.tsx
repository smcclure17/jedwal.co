import { CopyField } from "./CopyField";

export interface ApiCopyLinkProps {
  apiUrl: string;
  accountId: string;
  worksheets: string[];
}

export const ApiCopyLink = async ({
  accountId,
  apiUrl,
  worksheets,
}: ApiCopyLinkProps) => {
  return (
    <CopyField
      text={`https://api.jedwal.co/api/${accountId}/${apiUrl}`}
      worksheets={worksheets}
    />
  );
};
