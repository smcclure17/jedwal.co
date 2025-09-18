"use client";

import config from "@/config";
import { useState } from "react";
import { Spinner } from "./Spinner";

import { Source_Code_Pro } from "next/font/google";

const sourceCode = Source_Code_Pro({
  weight: "400",
  subsets: ["latin"],
});

interface DocApiSlugUpdaterProps {
  apiName: string;
  accountId: string;
  defaultSlug: string;
}

export const DocApiSlugUpdater = ({
  apiName,
  accountId,
  defaultSlug,
}: DocApiSlugUpdaterProps) => {
  const [submitStatus, setSubmitStatus] = useState<
    "success" | "standby" | "sending" | "failure"
  >("standby");
  const [slug, setSlug] = useState<string>(defaultSlug);
  const [finalizedSlug, setFinalizedSlug] = useState<string>(slug);

  const publishContent = async () => {
    setSubmitStatus("sending");
    const res = await fetch(`${config.apiUrl}/doc/update-slug`, {
      method: "POST",
      body: JSON.stringify({
        owner_id: accountId,
        api_name: apiName,
        slug: slug,
      }),
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });

    if (res.status !== 200) {
      alert("Slug update failed. Please try again later.");
    }
    setSubmitStatus("success");
    setFinalizedSlug(slug)
    setTimeout(() => setSubmitStatus("standby"), 3000); // reset
  };

  return (
    <div className="flex flex-col space-y-1">
      <span className={`${sourceCode.className}`}>/{finalizedSlug}/</span>
      <div className="flex flex-row space-x-2 text-sm">
        <input
          onChange={(e) => setSlug(e.target.value)}
          className="border rounded-lg px-2 text-gray-400"
          defaultValue={slug}
        ></input>
        <button
          onClick={() => publishContent()}
          className="border px-2 py-0.5 rounded-lg text-sm hover:bg-gray-50"
          disabled={submitStatus !== "standby"}
        >
          Update Slug
        </button>
        {submitStatus === "sending" && <Spinner srText="updating slug" />}
        {submitStatus === "success" && (
          <svg
            className="w-5 h-5"
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
        )}
      </div>
    </div>
  );
};

export const CopyField = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <div className={`w-full max-w-xl ${sourceCode.className}`}>
        <div className="relative">
          <label htmlFor="npm-install-copy-button" className="sr-only">
            Label
          </label>
          <input
            id="npm-install-copy-button"
            type="text"
            className="col-span-6 bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={text}
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className={`bg-gray-50 absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 hover:bg-gray-100 rounded-md p-2 inline-flex items-center justify-center ${
              copied ? "bg-gray-100" : ""
            }`}
          >
            {copied ? (
              <svg
                className="w-3.5 h-3.5 text-blue-700"
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
