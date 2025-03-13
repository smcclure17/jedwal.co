import config from "@/config";
import Image from "next/image";
import React from "react";

export interface UploadSuccessScreenProps {
  orgId: string;
}

export const CreateOrgSuccessScreen = ({ orgId }: UploadSuccessScreenProps) => {
  return (
    // TODO: make alignment better
    <div className="flex flex-col">
      <Image
        src={`/logo-cropped.svg`}
        alt="logo"
        width={100}
        height={100}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
        Success!
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Your organization has been created.
      </p>
      <a
        href={`${config.dashUrl}/${orgId}`}
        className="mt-2 text-md text-[#005430] hover:underline"
      >
        Take me there!
      </a>
    </div>
  );
};
