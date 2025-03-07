"use client";
import React, { useState } from "react";

export interface TagInputProps {
  /**
   * The tags that are currently selected
   */
  emails: string[];
  /**
   * A state function to update the tags
   */
  setEmails: React.Dispatch<React.SetStateAction<string[]>>;
  /**
   * The maximum number of tags that can be added
   */
  maxTags?: number;
}

/**
 * A TagInput component that allows users to add and remove tags for a file.
 *
 * - The component receives the current tags and a state updater function (`setTags`) as props.
 * - Users can add tags by typing and pressing 'Enter' or ',' and remove the last tag by pressing 'Backspace' when the input field is empty.
 * - Changes to the tags are reflected in the parent component's state through the `setTags` function, enabling two-way data binding.
 */

export const EmailInput = ({
  emails,
  setEmails,
  maxTags = 20,
}: TagInputProps) => {
  const [input, setInput] = useState("");

  const onKeyDown = (e: any) => {
    // deselect the input when escape key is pressed
    if (e.key === "Escape") {
      e.target.blur();
    }

    // Prevent the user from adding more than the max tags but allow
    // them to delete tags with backspace and use tab to navigate
    if (emails.length >= maxTags && ["Backspace", "Tab"].includes(e.key)) {
      e.preventDefault();
      return;
    }

    const { key } = e;
    const trimmedInput = input.trim();

    // Create a new tag when the user presses comma or enter
    // TODO: validate emails here
    if (
      "Enter" === key &&
      trimmedInput.length &&
      !emails.includes(trimmedInput)
    ) {
      e.preventDefault();
      if (!emails.includes(trimmedInput)) {
        setEmails([...emails, trimmedInput]);
        setInput("");
      }
    }

    // Remove the last tag if:
    // - the input is empty
    // - the user presses backspace
    // - there is at least one tag to remove
    if (key === "Backspace" && !input.length && emails.length) {
      const tagsCopy = [...emails];
      const poppedTag = tagsCopy.pop();
      if (poppedTag) {
        e.preventDefault();
        setEmails(tagsCopy);
        setInput(poppedTag);
      }
    }
  };

  const onChange = (e: any) => {
    const { value } = e.target;
    setInput(value);
  };

  return (
    <div className="flex flex-col w-full">
      <div>
        <label
          htmlFor="tag-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Users to invite (emails)
        </label>
      </div>
      <input
        id="tag-input"
        autoComplete="off"
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={input}
        placeholder={
          emails.length >= 3 ? "Max 3 tags" : "Add an email then press enter..."
        }
        color="transparent"
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <div className="flex flex-row space-x-2 pt-2 flex-wrap">
        {emails.map((email) => (
          <div className="mb-1" key={email}>
            <ContentTag name={email}/>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Represents a content tag component.
 */
export interface ContentTagProps {
  name: string;
}

export const ContentTag = React.forwardRef<HTMLAnchorElement, ContentTagProps>(
  ({ name }, ref) => {
    return (
      <span
        ref={ref}
        className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border"
      >
        {name}
      </span>
    );
  }
);
