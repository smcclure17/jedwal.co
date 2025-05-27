"use client";
import React, { useState } from "react";
import { Patrick_Hand } from "next/font/google";
import { Input } from "./ui/input";

import dynamic from "next/dynamic";

// Dynamic import with SSR disabled to prevent HTMLElement errors
const GooglePicker = dynamic(
  () => import("@/components/GoogleFilePicker").then((mod) => mod.GooglePicker),
  { ssr: false }
);

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

function extractGoogleSheetId(url: string | null): string {
  if (!url) return "";
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : "";
}

export interface CreateApiFormProps {
  accountId: string;
  label?: boolean;
  disabled?: boolean;
  type: "doc" | "api";
}

export const CreateApiForm = ({
  accountId,
  type,
  label = true,
  disabled = false,
}: CreateApiFormProps) => {
  const [sheetUrl, setSheetUrl] = useState("");
  return (
    <div className="w-full">
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        {label && (
          <label
            htmlFor="create"
            className={`${patrick.className} text-2xl font-extrabold`}
          >
            Create a new {type === "doc" ? "Post" : "API"}
          </label>
        )}
        <div
          className={`relative ${patrick.className} text-xl pt-2 flex flex-row space-x-2`}
        >
          <Input
            disabled={disabled}
            type="text"
            onChange={(e) => {
              setSheetUrl(extractGoogleSheetId(e.target.value));
            }}
            placeholder={
              disabled
                ? `Upgrade to premium create more ${
                    type === "doc" ? "Posts" : "Docs"
                  }`
                : `Paste Google ${type === "doc" ? "Document" : "Sheet"} URL`
            }
            required
          />
          <GooglePicker
            accountId={accountId}
            type={type}
            fileId={sheetUrl}
            disabled={disabled}
          />
        </div>
      </form>
    </div>
  );
};
