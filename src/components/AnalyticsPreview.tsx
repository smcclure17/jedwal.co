import { getSheetAnalytics } from "@/data/fetching";
import { use } from "react";
import { AnalyticsLineChart } from "./AnalyticsLineChart";

export interface AnalyticsPreviewProps {
  apiName: string;
}

export const AnalyticsPreview = ({ apiName }: AnalyticsPreviewProps) => {
  const data = use(getSheetAnalytics(apiName));
  return (
    <div className="rounded-md border w-[510px] bg-gray-50 mt-2 text-gray-600">
      <p className="px-4 py-2">API visits over the last 7 days</p>
      <AnalyticsLineChart data={data} />
    </div>
  );
};
