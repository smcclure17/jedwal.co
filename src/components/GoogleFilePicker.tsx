"use client";

import config from "@/config";
import { useGooglePickerToken } from "@/data/hooks";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { createApi } from "@/lib/utils";
import { Spinner } from "./Spinner";

const events = [
  "picker:oauth:error",
  "picker:oauth:response",
  "picker:picked",
  "picker:canceled",
];

export interface GooglePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: (event: any) => void;
  fileId: string;
  accountId: string;
  type: "doc" | "api";
  token?: string;
  disabled?: string;
}

const GooglePickerClient = ({
  type,
  accountId,
  isOpen,
  fileId,
  onClose,
  token,
  onAuth,
}: GooglePickerProps) => {
  const pickerRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const redirectSlug = type === "doc" ? "posts" : "apis"

  // Load picker library
  useEffect(() => {
    import("@googleworkspace/drive-picker-element")
      .then(() => setIsReady(true))
      .catch(console.error);
  }, []);

  // Handle picker events
  useEffect(() => {
    if (!isReady || !pickerRef.current) return;

    const handleEvent = async (e: any) => {
      if (e.type === "picker:picked") {
        try {
          onClose();
          const data = await createApi(e.detail.docs[0].id, type, accountId);
          console.log("data", data);
          window.location.href = `${config.dashUrl}/${accountId}/${redirectSlug}/${data.api_name}`;
        } catch (error) {
          console.error("Failed to create API:", error);
        }
      }

      if (e.type === "picker:canceled") {
        onClose();
      }

      if (e.type === "picker:oauth:response") {
        onAuth(e);
      }
    };

    events.forEach((event) =>
      pickerRef.current.addEventListener(event, handleEvent)
    );

    return () => {
      if (pickerRef.current) {
        events.forEach((event) =>
          pickerRef.current.removeEventListener(event, handleEvent)
        );
      }
    };
  }, [isReady, onAuth, onClose]);

  if (!isOpen || !isReady) {
    return <></>;
  }

  return (
    <div>
      {/* @ts-ignore */}
      <drive-picker
        ref={pickerRef}
        client-id="293432620407-osstrkdh0garuvogej84muq2tcbu35bk.apps.googleusercontent.com"
        app-id="293432620407"
        origin={window.location.origin}
        oauth-token={token}
      >
        {/* @ts-ignore */}
        <drive-picker-docs-view
          mode="LIST"
          file-ids={fileId}
        />
        {/* @ts-ignore */}
      </drive-picker>
    </div>
  );
};

export const GooglePicker = ({
  accountId,
  fileId,
  type,
  disabled = false,
}: {
  accountId: string;
  fileId: string;
  type: "doc" | "api";
  disabled?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { accessToken, handleAuth } = useGooglePickerToken();

  const handleClose = () => setIsOpen(false);
  const handleToggle = () => setIsOpen((prev) => !prev);

  // SSR guard
  if (typeof window === "undefined") {
    return <div>Loading Google Drive Picker...</div>;
  }

  return (
    <>
      <Button
        className="px-5 bg-[#005430]"
        onClick={handleToggle}
        disabled={disabled}
      >
        {isOpen ? <Spinner srText="Creating API..." /> : "Create"}
      </Button>
      <GooglePickerClient
        accountId={accountId}
        type={type}
        fileId={fileId}
        isOpen={isOpen}
        onClose={handleClose}
        token={accessToken}
        onAuth={handleAuth}
      />
    </>
  );
};
