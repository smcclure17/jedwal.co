"use client";
import { UserSheet } from "@/data/fetching";
import { Patrick_Hand } from "next/font/google";
import Link from "next/link";
import { useParams } from "next/navigation";

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

export interface ApiCardProps {
  apiData: UserSheet;
}

export const ApiCard = ({ apiData }: ApiCardProps) => {
  const { api_name, sheet_id, spreadsheet_name } = apiData;
  const params = useParams();
  const selected = params.api === api_name;

  return (
    <Link
      href={`/${apiData.api_name}`}
      className={`px-2 bg-slate-50 rounded-sm hover:bg-slate-100 py-1 ${
        selected ? "border border-gray-300 bg-slate-50" : ""
      }`}
    >
      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center space-x-2">
          <h5 className={`text-xl tracking-tight text-gray-800`}>
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
