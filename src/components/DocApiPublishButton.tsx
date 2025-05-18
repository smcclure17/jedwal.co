"use client";

import config from "@/config";
import { useState } from "react";
import { Spinner } from "./Spinner";

interface DocApiPublishButtonProps {
  apiName: string;
  accountId: string;
}

export const DocApiPublishButton = ({
  apiName,
  accountId,
}: DocApiPublishButtonProps) => {
  const [submitStatus, setSubmitStatus] = useState<
    "success" | "standby" | "sending" | "failure"
  >("standby");

  const publishContent = async () => {
    setSubmitStatus("sending");
    const res = await fetch(`${config.apiUrl}/doc/publish`, {
      method: "POST",
      body: JSON.stringify({
        owner_id: accountId,
        api_name: apiName,
      }),
      credentials: "include",
      headers: {"Content-type": "application/json"}
    });

    if (res.status !== 200) {
      alert("Post refresh failed. Please try again later.")
    }
    setSubmitStatus("success");
    setTimeout(() => setSubmitStatus("standby"), 3000); // reset
  };

  return (
    <div className="flex flex-row space-x-2">
      <button
        onClick={() => publishContent()}
        className="border px-2 py-0.5 rounded-lg text-sm hover:bg-gray-50"
        disabled={submitStatus !== "standby"}
      >
        Refresh Content
      </button>
      {submitStatus === "sending" && (
        <Spinner srText="updating cache time to live" />
      )}
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
  );
};
