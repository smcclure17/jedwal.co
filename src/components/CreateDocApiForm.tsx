"use client";
import React, { useState } from "react";
import { Patrick_Hand } from "next/font/google";
import config from "@/config";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./Spinner";

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export interface CreateApiFormProps {
  accountId: string;
  label?: boolean;
  disabled?: boolean;
}

export const CreateDocApiForm = ({
  accountId,
  label = true,
  disabled = false,
}: CreateApiFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [docId, setDocId] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${config.apiUrl}/doc`, {
        method: "POST",
        body: JSON.stringify({
          doc_id: docId,
          owner_id: accountId,
        }),
        credentials: "include",
        headers: {"Content-type": "application/json"}
      });

      if (res.status === 415) {
        const message = await res.json()
        throw new Error(message.detail);
      }

      if (!res.ok) {
        throw new Error(
          `Request returned status ${res.status}: ${res.statusText}`
        );
      }

      const data = await res.json();
      // NOTE: can't use router.push here b/c we need to reload the whole layout.
      window.location.href = `${config.dashUrl}/${accountId}/posts/${data.api_name}`;
      setDocId("")
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(`Failed to create API. ${error}`);
    }
  };

  return (
    <div className="w-full">
      <form className="w-full" onSubmit={onSubmit}>
        {label && (
          <label
            htmlFor="create"
            className={`${patrick.className} text-2xl font-extrabold`}
          >
            Create a new Post
          </label>
        )}
        <div
          className={`relative ${patrick.className} text-xl pt-2 flex flex-row space-x-2`}
        >
          <Input
            disabled={disabled}
            type="text"
            onChange={(e) => {setDocId(e.target.value)}}
            placeholder={
              disabled
                ? "Upgrade to premium create more APIs"
                : "Paste Google Doc URL"
            }
            required
          />
          <Button
            disabled={disabled || docId === ""}
            type="submit"
            size={"default"}
            className="px-5 bg-[#005430]"
          >
            {isLoading ? <Spinner srText="Creating API..." /> : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};
