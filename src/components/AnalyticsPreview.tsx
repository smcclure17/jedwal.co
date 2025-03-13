import { getSheetAnalytics } from "@/data/fetching";
import { use } from "react";
import { AnalyticsLineChart } from "./AnalyticsLineChart";

export interface AnalyticsPreviewProps {
  accountId: string;
  sheetApiId: string;
}

export const AnalyticsPreview = ({
  accountId,
  sheetApiId,
}: AnalyticsPreviewProps) => {
  const data = use(getSheetAnalytics(accountId, sheetApiId));
  if (data.status !== "logged_in") return <></>;
  return (
    <div className="rounded-md border w-[510px] bg-gray-50 mt-2 text-gray-600">
      <p className="px-4 py-2">API Traffic over the last 7 days</p>
      <AnalyticsLineChart data={data.data} />
    </div>
  );
};
