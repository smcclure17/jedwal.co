import React, { Fragment, useEffect, useState } from "react";
import { EmailInput } from "./EmailInput";
import config from "@/config";
import { LoadingSpinner } from "./LoadingSpinner";
import { Spinner } from "./Spinner";

interface ModalProps {
  isOpen: boolean;
  org: any;
  onClose: () => void;
}

type SendingState = "sending" | "success" | "failed" | null;

const submitEmails = async (org: any, emails: string[]) => {
  const res = await fetch(`${config.apiUrl}/invite-users-to-organization`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify({ user_emails: emails, org_id: org.account_id }),
    credentials: "include",
  });

  if (res.status !== 200) {
    throw new Error(
      "Failed to invite. Please check that your emails are valid."
    );
  }
};

export const InviteUsersModal = ({ isOpen, onClose, org }: ModalProps) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [sendingState, setSendingState] = useState<SendingState>(null);

  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.key === "Escape" && isOpen) onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Modal content - rendered directly in the DOM (no portal)
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div
          className={`max-w-2xl w-full transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-5">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {`Add people to collaborate in ${org.name}`}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Users will be added to the organization, if they exist.
            </p>
          </div>

          {/* Content */}
          <div className="mt-2">
            <div className="space-y-4">
              <div>
                <div className="mt-1 space-y-2">
                  <EmailInput
                    emails={emails}
                    setEmails={(emails) => setEmails(emails)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3">
            {sendingState !== "sending" ? (
              <button
                disabled={emails.length === 0}
                type="button"
                className="inline-flex justify-center rounded-md bg-[#005430] px-3 py-1 text-sm font-medium text-white shadow-md disabled:opacity-75"
                onClick={() => {
                  setSendingState("sending");
                  submitEmails(org, emails)
                    .then(() => {
                      setSendingState("success");
                      setEmails([]);
                    })
                    .catch(() => setSendingState("failed"));
                }}
              >
                Invite users
              </button>
            ) : (
              <Spinner srText="inviting users..." />
            )}
          </div>

          {sendingState === "success" && (
            <div className="border mt-2 px-2 py-1 rounded-md border-[#005430] bg-gray-100 text-sm">
              Success!
            </div>
          )}
          {sendingState === "failed" && (
            <div className="border mt-2 px-2 py-1 rounded-md border-red-500 bg-gray-100 text-sm">
              Something went wrong. Please make sure your emails are correct.
            </div>
          )}

          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
