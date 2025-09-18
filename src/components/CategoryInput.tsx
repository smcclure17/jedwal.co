"use client";

import config from "@/config";
import { useState } from "react";

export const CategoryInput = ({
  apiName,
  accountId,
}: {
  apiName: string;
  accountId: string;
}) => {
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const addCategory = async () => {
    if (!category.trim()) return;

    try {
      const response = await fetch(
        `${config.apiUrl}/doc/add-category`,
        {
          method: "POST",
          credentials: "include",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            category: category.trim(),
            owner_id: accountId,
            api_name: apiName,
          }),
        }
      );

      if (response.ok) {
        setMessage("Added!");
        setCategory("");
        window.location.reload();
      } else {
        setMessage("Error");
      }
    } catch (error) {
      setMessage("Error");
    }
  };

  return (
    <div className="flex gap-2">
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="E.g., 'metro'"
        className="border px-2 py-1 rounded-lg text-sm"
        onKeyDown={(e) => e.key === "Enter" && addCategory()}
      />
      <button
        onClick={addCategory}
        className="border rounded-lg px-3 text-sm hover:bg-gray-100"
      >
        Add Category
      </button>
      {message && <span className="text-sm">{message}</span>}
    </div>
  );
};

export const CategoryList = ({
  apiName,
  accountId,
  categories,
}: {
  apiName: string;
  accountId: string;
  categories: string[];
}) => {
  const [error, setError] = useState<string | null>(null);
  const [removingCategory, setRemovingCategory] = useState<string | null>(null);

  const removeCategory = async (category: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${category}" from this post?`
    );
    if (!confirmed) return;

    setRemovingCategory(category);
    setError(null);

    try {
      const response = await fetch(
        `${
          config.apiUrl
        }/doc/delete-category/${accountId}/${apiName}?category=${encodeURIComponent(
          category.trim()
        )}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Failed to delete");
      }
      window.location.reload();
    } catch {
      setError("could not remove category");
      setTimeout(() => setError(null), 2000);
    } finally {
      setRemovingCategory(null);
    }
  };

  return (
    <div className="flex flex-row space-x-2">
      {categories.map((cat) => (
        <button
          key={cat}
          className="border px-2 rounded-lg text-sm hover:border-red-500 disabled:opacity-50"
          disabled={removingCategory === cat}
          onClick={() => removeCategory(cat)}
        >
          {removingCategory === cat ? "Removing..." : cat}
        </button>
      ))}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
