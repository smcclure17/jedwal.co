"use client";

import config from "@/config";
import { useState } from "react";
import { Spinner } from "./Spinner";

export interface CategoriesProps {
  apiName: string;
  accountId: string;
  defaultCategories: string[];
}

type AsyncStatus = "success" | "standby" | "sending" | "failure";

// Custom hook for async operations with status
const useAsyncAction = (onSuccess?: () => void) => {
  const [status, setStatus] = useState<AsyncStatus>("standby");

  const execute = async (asyncFn: () => Promise<void>) => {
    setStatus("sending");
    try {
      await asyncFn();
      setStatus("success");
      onSuccess?.();
      setTimeout(() => setStatus("standby"), 2000);
    } catch {
      setStatus("failure");
      setTimeout(() => setStatus("standby"), 3000);
    }
  };

  return { status, execute, isLoading: status === "sending" };
};

const StatusIndicator = ({
  status,
  errorText,
}: {
  status: AsyncStatus;
  errorText?: string;
}) => (
  <>
    {status === "sending" && <Spinner srText="processing" />}
    {status === "success" && (
      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 16 12">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5.917 5.724 10.5 15 1.5"
        />
      </svg>
    )}
    {status === "failure" && (
      <span className="text-red-500 text-sm">{errorText}</span>
    )}
  </>
);

export const Categories = ({
  apiName,
  accountId,
  defaultCategories,
}: CategoriesProps) => {
  const [categories, setCategories] = useState(defaultCategories);
  const [newCategory, setNewCategory] = useState("");
  const [removingCategory, setRemovingCategory] = useState<string | null>(null);

  const addAction = useAsyncAction(() => setNewCategory(""));
  const removeAction = useAsyncAction();

  const validateCategory = (category: string): string | null => {
    const trimmed = category.trim();
    if (!trimmed) return "Category cannot be empty";
    if (!/^[a-zA-Z0-9]+$/.test(trimmed))
      return "Category must be alphanumeric only";
    if (categories.some((cat) => cat.toLowerCase() === trimmed.toLowerCase())) {
      return "Category already exists";
    }
    return null;
  };

  const addCategory = () => {
    const validationError = validateCategory(newCategory);
    if (validationError) {
      // Show error briefly without changing main status
      alert(validationError);
      return;
    }

    addAction.execute(async () => {
      const response = await fetch(`${config.apiUrl}/doc/add-category`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: newCategory.trim(),
          owner_id: accountId,
          api_name: apiName,
        }),
      });

      if (!response.ok) throw new Error("Failed to add");
      setCategories((prev) => [...prev, newCategory.trim()]);
    });
  };

  const removeCategory = (category: string) => {
    if (!confirm(`Remove "${category}"?`)) return;

    setRemovingCategory(category);
    removeAction.execute(async () => {
      const response = await fetch(
        `${
          config.apiUrl
        }/doc/delete-category/${accountId}/${apiName}?category=${encodeURIComponent(
          category
        )}`,
        { method: "DELETE", credentials: "include" }
      );

      if (!response.ok) throw new Error("Failed to delete");
      setCategories((prev) => prev.filter((item) => item !== category));
      setRemovingCategory(null);
    });
  };

  return (
    <div className="space-y-3">
      {/* Add Category */}
      <div className="flex gap-2 items-center">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="E.g., 'metro'"
          className={`border px-2 py-1 rounded-lg text-sm ${
            newCategory && validateCategory(newCategory)
              ? "border-red-300 bg-red-50"
              : ""
          }`}
          onKeyDown={(e) => e.key === "Enter" && addCategory()}
          disabled={addAction.isLoading}
        />
        <button
          onClick={addCategory}
          className="border rounded-lg px-3 py-1 text-sm hover:bg-gray-100 disabled:opacity-50"
          disabled={
            addAction.isLoading ||
            (newCategory && !!validateCategory(newCategory))
          }
        >
          Add
        </button>
        <StatusIndicator
          status={addAction.status}
          errorText="Error adding category"
        />
      </div>

      {/* Category List */}
      <div className="flex flex-wrap gap-2 items-center">
        {categories.map((cat) => (
          <div key={cat} className="flex items-center gap-1">
            <button
              className="border px-2 py-1 rounded-lg text-sm hover:border-red-500 disabled:opacity-50"
              disabled={removingCategory === cat}
              onClick={() => removeCategory(cat)}
            >
              {cat}
            </button>
            {removingCategory === cat && <Spinner srText={`removing ${cat}`} />}
          </div>
        ))}
        {removeAction.status === "failure" && (
          <span className="text-red-500 text-sm">
            Could not remove category
          </span>
        )}
      </div>
    </div>
  );
};
