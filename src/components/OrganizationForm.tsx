"use client";
import React, { useState } from "react";
import { EmailInput } from "./EmailInput";
import { LoadingSpinner } from "./LoadingSpinner";
import config from "@/config";
import { CreateOrgSuccessScreen } from "./CreateOrgSuccessScreen";

type UploadStatus = "success" | "failure" | "loading" | null;

const sendCreateRequest = async (name: string, invitees: string[]) => {
  const res = await fetch(`${config.apiUrl}/create-organization`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify({ name, invitees }),
    credentials: "include",
  });

  if (res.status !== 200) {
    throw new Error(`Failed to create org. ${res.statusText}`);
  }
  const data = await res.json();
  return data.id;
};

export const OrganizationForm = () => {
  const [orgName, setOrgName] = useState<string>("");
  const [emails, setEmails] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(null);
  const [orgId, setOrgId] = useState<string | null>(null);

  if (uploadStatus === "success") {
    return <CreateOrgSuccessScreen orgId={orgId ?? ""} />;
  }
  if (uploadStatus === "failure") {
    return <>Unexpected Failure. Please try again later.</>;
  }

  return (
    <>
      <form
        className="max-w-lg"
        onSubmit={(e) => {
          e.preventDefault();
          setUploadStatus("loading");

          sendCreateRequest(orgName, emails)
            .then((orgId) => {
              setUploadStatus("success");
              setOrgId(orgId);
            })
            .catch((e) => {
              console.log(e);
              setUploadStatus("failure");
            });
        }}
      >
        <div className="mb-5">
          <label
            htmlFor="name-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Organization Name
          </label>
          <div>
            <input
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Choose a name for your organization..."
              type="text"
              id="name-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <EmailInput emails={emails} setEmails={(emails) => setEmails(emails)} />
        <div className="flex justify-end">
          <button
            disabled={orgName === "" || uploadStatus === "loading"}
            type="submit"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#005430] border border-transparent rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50"
          >
            {uploadStatus === "loading" && <LoadingSpinner />}
            Create organization
          </button>
        </div>
      </form>
    </>
  );
};
