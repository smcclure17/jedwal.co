"use client";

import { useState } from "react";
import { Spinner } from "./Spinner";
import config from "@/config";

// TODO: in the UI/dropdown, we limit options to these durations.
// but the field can be anything in the backend (seconds).
// Need to find a way to handle custom values
const timeOptions = [
  { label: "1 second", value: 1, premiumOnly: true },
  { label: "5 seconds", value: 5, premiumOnly: true },
  { label: "15 seconds", value: 15, premiumOnly: true },
  { label: "30 seconds", value: 30, premiumOnly: true },
  { label: "1 minute", value: 60, premiumOnly: false },
  { label: "2 minutes", value: 120, premiumOnly: false },
  { label: "5 minutes", value: 300, premiumOnly: false },
  { label: "10 minutes", value: 600, premiumOnly: false },
  { label: "30 minutes", value: 1800, premiumOnly: false },
  { label: "45 minutes", value: 2700, premiumOnly: false },
  { label: "1 hour", value: 3600, premiumOnly: false },
  { label: "2 hours", value: 7200, premiumOnly: false },
  { label: "8 hours", value: 28800, premiumOnly: false },
  { label: "12 hours", value: 43200, premiumOnly: false },
];

export const postTtlUpdate = async (
  accountId: string,
  apiName: string,
  ttl: number
) => {
  const res = await fetch(`${config.apiUrl}/update-cache-duration`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify({
      owner_id: accountId,
      sheet_api_name: apiName,
      cache_duration: ttl,
    }),
  });

  if (res.status !== 200) throw new Error("Failed to delete API");
};

export interface CacheInputProps {
  defaultTtl: number;
  accountId: string;
  name: string;
  isPremiumUser?: boolean;
}

export const CacheInput = ({
  defaultTtl,
  accountId,
  name,
  isPremiumUser = false,
}: CacheInputProps) => {
  const [ttl, setTtl] = useState(defaultTtl);
  const [submitStatus, setSubmitStatus] = useState<
    "success" | "standby" | "sending"
  >("standby");

  const updateTtl = async (value: string) => {
    const oldTtl = ttl;
    const newTtl = parseInt(value);
    setSubmitStatus("sending");

    try {
      setTtl(newTtl);
      await postTtlUpdate(accountId, name, newTtl);
      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus("standby"), 3000); // reset
    } catch {
      setTtl(oldTtl);
      alert("failure!");
    }
  };

  return (
    <div className="flex flex-row items-center space-x-1">
      <span>Refresh data every</span>
      <form>
        <div className="flex flex-row space-x-2 items-center">
          <select
            value={ttl}
            onChange={(e) => updateTtl(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-1 py-0.5"
          >
            {timeOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={!isPremiumUser && option.premiumOnly}
              >
                {option.label}
              </option>
            ))}
          </select>
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
      </form>
    </div>
  );
};
