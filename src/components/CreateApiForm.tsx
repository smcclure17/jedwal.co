"use client";
import React, { useState } from "react";
import { Patrick_Hand } from "next/font/google";

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export interface CreateApiFormProps {
  label?: boolean;
  disabled?: boolean;
}

export const CreateApiForm = ({
  label = true,
  disabled = false,
}: CreateApiFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch(`https://jedwal.co/create-api`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(
          `Request returned status ${res.status}: ${res.statusText}`
        );
      }

      const data = await res.json();
      // NOTE: can't use router.push here b/c we need to reload the whole layout.
      window.location.href = `/app/${data.api_name}`;
      form.reset();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(`Failed to create API: ${error}`);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form className="w-full" onSubmit={onSubmit}>
        {label && (
          <label htmlFor="create" className={`${patrick.className} text-2xl`}>
            Create a new API
          </label>
        )}
        <div className={`relative ${patrick.className} text-xl pt-2`}>
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Icon />
          </div>
          <input
            disabled={disabled}
            type="text"
            name="sheet_id"
            id="create-api"
            className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-[#005430]-500 focus:border-[#005430]"
            placeholder={
              disabled
                ? "Upgrade to premium create more APIs"
                : "Paste Google Sheet URL"
            }
            required
          />
          <div className="absolute inset-y-0 end-0 flex items-center pe-3">
            {!isLoading ? (
              <button
                disabled={disabled}
                type="submit"
                className={`text-white absolute end-2 bottom-2 bg-[#005430] focus:ring-4 focus:outline-none focus:ring-slate-200 font-medium rounded-md text-sm px-5 py-1.5 ${
                  disabled ? "" : "hover:bg-[#00331d]"
                }`}
              >
                Create
              </button>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
    >
      <path
        fillRule="evenodd"
        d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const Spinner = () => {
  return (
    <>
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-white animate-spin fill-[#005430]"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Creating API...</span>
    </>
  );
};
