"use client";
import React, { useState } from "react";
import { Source_Code_Pro } from "next/font/google";

const sourceCode = Source_Code_Pro({
  weight: "400",
  subsets: ["latin"],
});

export const CopyField = ({
  text,
  worksheets,
}: {
  text: string;
  worksheets: string[];
}) => {
  const [copied, setCopied] = useState(false);
  const [worksheet, setWorksheet] = useState(
    worksheets[0] === "Sheet1" ? "" : `?worksheet=${worksheets[0]}`
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${text}${worksheet}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <form className="max-w-sm mx-auto">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <select
          onChange={(e) =>
            setWorksheet(
              e.target.value === "Sheet1" ? "" : `?worksheet=${e.target.value}`
            )
          }
          id="worksheets"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {worksheets.map((sheet) => (
            <option value={sheet}>{sheet}</option>
          ))}
        </select>
      </form>
      <div className={`w-full max-w-lg ${sourceCode.className}`}>
        <div className="relative">
          <label htmlFor="npm-install-copy-button" className="sr-only">
            Label
          </label>
          <input
            id="npm-install-copy-button"
            type="text"
            className="col-span-6 bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={`${text}${worksheet}`}
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center"
          >
            {copied ? (
              <svg
                className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
