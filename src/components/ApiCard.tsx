"use client";
import config from "@/config";
import { ApiData, DocApiData } from "@/data/fetching";
import { Patrick_Hand } from "next/font/google";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Tooltip } from "react-tooltip";

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
      href={`${config.dashUrl}/${accountId}/apis/${apiData.sheet_api_name}`}
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
      </div>
    </Link>
  );
};

interface FailureCardProps {
  sheet_api_name: string;
  google_sheet_id: string;
  hint: string;
}

export const FailureCard = ({
  sheet_api_name,
  google_sheet_id,
  hint,
}: FailureCardProps) => {
  return (
    <>
      <Tooltip id="failure-hint-tooltip" />
      <div
        data-tooltip-id="failure-hint-tooltip"
        data-tooltip-content={hint}
        className={`relative px-2 bg-white py-1 rounded-lg shadow-sm border border-1.5 border-gray-400 select-none`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(0,0,0,0.1)_50%,transparent_60%)] bg-[length:10px_10px]"></div>
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center justify-between">
            <h5 className={`text-md text-black`}>Can't Access Google Sheet</h5>
            <p className={`text-md text-gray-500 ${patrick.className} pb-1`}>
              /{sheet_api_name}
            </p>
          </div>
          <p className={`text-sm ${patrick.className} text-slate-400`}>
            https://docs.google.com/spreadsheet/d/{google_sheet_id}
          </p>
        </div>
      </div>
    </>
  );
};

export interface DocApiCardProps {
  docApiData: DocApiData;
  accountId: string;
}

export const DocApiCard = ({ docApiData, accountId }: DocApiCardProps) => {
  const { doc_api_name, title } = docApiData;
  const params = useParams();

  const selected = params.post === doc_api_name;
  return (
    <Link
      href={`${config.dashUrl}/${accountId}/posts/${doc_api_name}`}
      className={`px-2 bg-white py-1 rounded-lg shadow-sm ${
        selected
          ? "border border-green-800 border-1.5"
          : "border border-1.5 border-gray-100 hover:bg-slate-50"
      }`}
    >
      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center justify-between">
          <h5 className={`text-md text-black`}>{title}</h5>
          <p className={`text-md text-gray-500 ${patrick.className} pb-1`}>
            /{doc_api_name}
          </p>
        </div>
      </div>
    </Link>
  );
};