"use client";

import config from "@/config";

export interface DeleteApiButtonProps {
  apiName: string;
}

// TODO: had to move this from data/fetching.ts because it is used
// on the client, and the other file imported server-only stuff (next/headers/)
export const deleteApi = async (apiName: string) => {
  const res = await fetch(`${config.apiUrl}/delete-api/${apiName}`, {
    credentials: "include",
  });

  if (res.status !== 200) throw new Error("Failed to delete API");
};

export const DeleteApiButton = ({ apiName }: DeleteApiButtonProps) => {
  const handleDeleteApi = () => {
    const isConfirmed = confirm(
      `Are you sure you want to delete the API /${apiName}? This action cannot be undone.`
    );

    if (isConfirmed) {
      deleteApi(apiName)
        .then(() => {
          window.location.href = "/app";
        })
        .catch(() => {
          alert("Failed to delete API. Please try again later.");
        });
    }
  };

  return (
    <button
      type="button"
      className="w-32 py-0.5 shadow transition ease-in-out duration-200 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center"
      onClick={() => handleDeleteApi()}
    >
      Delete Api
    </button>
  );
};
