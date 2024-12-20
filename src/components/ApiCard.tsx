// "use client";
import { ApiData } from "@/data/fetching";
import { Patrick_Hand } from "next/font/google";
import Link from "next/link";

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

export interface ApiCardProps {
  apiData: ApiData;
  isSelected: boolean;
}

export const ApiCard = ({ apiData, isSelected}: ApiCardProps) => {
  const { api_name, sheet_id, spreadsheet_name } = apiData;
  return (
    <Link
      href={`/${apiData.api_name}`}
      className={`px-2 bg-white py-1 rounded-lg shadow-sm ${
        isSelected ? "border border-green-800 border-1.5" : "border border-1.5 border-gray-100 hover:bg-slate-50"
      }`}
    >
      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center space-x-2">
          <h5 className={`text-md tracking-tight text-black`}>
            {spreadsheet_name}
          </h5>
          <p className={`text-md text-gray-600 ${patrick.className} mt-1`}>
            /api/{api_name}
          </p>
        </div>
        <p className={`text-sm ${patrick.className} text-slate-500`}>
          https://docs.google.com/spreadsheet/d/{sheet_id}
        </p>
      </div>
    </Link>
  );
};
