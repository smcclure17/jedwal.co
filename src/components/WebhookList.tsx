"use client";

import { useState } from "react";
import config from "@/config";

export interface WebhookListProps {
  webhooks: any[];
  ownerId: string;
  apiName: string;
}

async function createWebhook(
  ownerId: string,
  apiName: string,
  url: string,
  method: string,
  payload: string
) {
  const res = await fetch(`${config.apiUrl}/doc/add-webhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      owner_id: ownerId,
      api_name: apiName,
      webhook: { url, method, payload: {} },
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create webhook: ${res.statusText}`);
  }
}

async function deleteWebhook(ownerId: string, apiName: string, url: string) {
  const res = await fetch(`${config.apiUrl}/doc/delete-webhook`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      owner_id: ownerId,
      api_name: apiName,
      url,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to delete webhook: ${res.statusText}`);
  }
}

export const WebhookList = ({
  webhooks,
  ownerId,
  apiName,
}: WebhookListProps) => {
  const [allWebhooks, setAllWebhooks] = useState(webhooks);
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [payload, setPayload] = useState("");

  const handleCreate = async () => {
    if (!url) return alert("Please enter a URL");
    try {
      await createWebhook(ownerId, apiName, url, method, payload);
      setAllWebhooks([...allWebhooks, { url, method, payload }]);
      setUrl("");
      setPayload("");
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleDelete = async (targetUrl: string) => {
    if (!confirm(`Delete webhook ${targetUrl}?`)) return;
    try {
      await deleteWebhook(ownerId, apiName, targetUrl);
      setAllWebhooks(allWebhooks.filter((w) => w.url !== targetUrl));
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Create new webhook */}
      <div className="flex flex-col space-y-2 border p-2 rounded text-sm">
        <div className="flex flex-row space-x-2">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
          <input
            type="text"
            placeholder="Webhook URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border p-1 rounded w-full"
          />
        </div>
        <textarea
          placeholder="Payload (optional)"
          value={payload}
          disabled={method !== "POST"}
          onChange={(e) => setPayload(e.target.value)}
          className="border p-1 rounded text-sm"
        />
        <button
          onClick={handleCreate}
          className="px-3 py-1 rounded rounded-lg border hover:bg-gray-100"
        >
          Add Webhook
        </button>
      </div>

      {/* Existing webhooks */}
      <div className="flex flex-col space-y-2">
        {allWebhooks.map((webhook: any, i: number) => (
          <div
            key={i}
            className="flex flex-row justify-between items-center border px-2 py-1 rounded"
          >
            <div className="flex flex-col">
              <span className="font-mono text-sm">{webhook.method}</span>
              <span className="text-sm">{webhook.url}</span>
            </div>
            <button
              onClick={() => handleDelete(webhook.url)}
              className="text-red-500 px-2 py-1 rounded underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
