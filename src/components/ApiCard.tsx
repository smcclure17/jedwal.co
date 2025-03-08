"use client";
import { ApiData } from "@/data/fetching";
import { Patrick_Hand } from "next/font/google";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

export interface ApiCardProps {
  apiData: ApiData;
}

export const ApiCard = ({ apiData }: ApiCardProps) => {
  const { api_name_formatted, api_name, sheet_id, spreadsheet_name } = apiData;
  const params = useParams();
  const path = usePathname();
  const selected = params.api === api_name;
  return (
    <Link
      href={`${path}/${apiData.api_name}`}
      className={`px-2 bg-white py-1 rounded-lg shadow-sm ${
        selected
          ? "border border-green-800 border-1.5"
          : "border border-1.5 border-gray-100 hover:bg-slate-50"
      }`}
    >
      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center justify-between">
          <h5 className={`text-md text-black`}>{spreadsheet_name}</h5>
          <p className={`text-md text-gray-500 ${patrick.className} pb-1`}>
            /api/{api_name_formatted}
          </p>
        </div>
        <p className={`text-sm ${patrick.className} text-slate-400`}>
          https://docs.google.com/spreadsheet/d/{sheet_id}
        </p>
      </div>
    </Link>
  );
};
