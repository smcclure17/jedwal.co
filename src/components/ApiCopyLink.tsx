import { CopyField } from "./CopyField";

export interface ApiCopyLinkProps {
  apiUrl: string;
  worksheets: string[];
}

export const ApiCopyLink = async ({ apiUrl, worksheets }: ApiCopyLinkProps) => {
  return (
    <CopyField
      text={`https://api.jedwal.co/api/${apiUrl}`}
      worksheets={worksheets}
    />
  );
};
