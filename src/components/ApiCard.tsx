"use client";
import config from "@/config";
import { ApiData } from "@/data/fetching";
import { Patrick_Hand } from "next/font/google";
import Link from "next/link";
import { useParams } from "next/navigation";

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

export interface ApiCardProps {
  apiData: ApiData;
  accountId: string;
}

export const ApiCard = ({ apiData, accountId }: ApiCardProps) => {
  const { sheet_api_name, google_sheet_id, spreadsheet_title } = apiData;
  const params = useParams();

  const selected = params.api === sheet_api_name;
  return (
    <Link
      href={`${config.dashUrl}/${accountId}/${apiData.sheet_api_name}`}
      className={`px-2 bg-white py-1 rounded-lg shadow-sm ${
        selected
          ? "border border-green-800 border-1.5"
          : "border border-1.5 border-gray-100 hover:bg-slate-50"
      }`}
    >
      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center justify-between">
          <h5 className={`text-md text-black`}>{spreadsheet_title}</h5>
          <p className={`text-md text-gray-500 ${patrick.className} pb-1`}>
            /{sheet_api_name}
          </p>
        </div>
        <p className={`text-sm ${patrick.className} text-slate-400`}>
          https://docs.google.com/spreadsheet/d/{google_sheet_id}
        </p>
      </div>
    </Link>
  );
};
