"use client";

import config from "@/config";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export interface DeleteDocApiButtonProps {
  accountId: string;
  apiName: string;
}

// TODO: had to move this from data/fetching.ts because it is used
// on the client, and the other file imported server-only stuff (next/headers/)
export const deleteApi = async (apiName: string, accountId: string) => {
  const res = await fetch(`${config.apiUrl}/doc/${accountId}/${apiName}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (res.status !== 200) throw new Error("Failed to delete API");
};

export const DeleteDocApiButton = ({
  apiName,
  accountId,
}: DeleteDocApiButtonProps) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const apiPathName = usePathname();
  const params = useParams();
  console.log("params", params);
  const pathName = apiPathName.split("/").slice(0, -1).join("/");

  const handleDeleteApi = () => {
    setIsDeleting(true);
    const isConfirmed = confirm(
      `Are you sure you want to delete the post /${accountId}/${apiName}? This action cannot be undone.`
    );

    if (isConfirmed) {
      deleteApi(apiName, accountId)
        .then(() => {
          window.location.href = `${pathName}`;
        })
        .catch(() => {
          alert("Failed to delete API. Please try again later.");
        });
    } else {
      setIsDeleting(false);
    }
  };

  return (
    <button
      className="underline text-red-600"
      onClick={() => handleDeleteApi()}
    >
      {isDeleting ? "Deleting..." : "Delete API"}
    </button>
  );
};
