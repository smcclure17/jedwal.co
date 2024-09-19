"use client";
import React, { useState } from "react";
import { Patrick_Hand, Source_Code_Pro } from "next/font/google";

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

const sourceCode = Source_Code_Pro({
  weight: "400",
  subsets: ["latin"],
});

export interface CodeBlockProps {
  apiName: string;
}

type Language = "python" | "javascript";

export const CodeBlock = ({ apiName }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<Language>("python");

  const codeString = `import requests
url = https://api.jedwal.co/api/${apiName}
response = requests.get(url)
response.raise_for_status()
data = response.json()

`;

  const jsCodeString = `const fetchApi = async () => {
  const url = https://api.jedwal.co/api/${apiName}
  const response = await fetch(url)
  if (!response.ok) throw new Error("HTTP Error!")
  const data = await response.json()
}`;

  const handleLanguageChange = (language: Language) => {
    setLanguage(language);
  };

  const copyToClipboard = async () => {
    const codeToCopy = language === "python" ? codeString : jsCodeString;
    try {
      await navigator.clipboard.writeText(codeToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <ul className="flex flex-wrap text-xs font-medium text-center text-gray-500 w-full pt-1">
        {["python", "javascript"].map((lang) => {
          return (
            <li className="me-2" key={lang}>
              <button
                onClick={() => handleLanguageChange(lang as Language)}
                className={`inline-block px-2 py-0.5 border rounded-md ${
                  lang === language ? "border-gray-500" : "bg-gray-100"
                }`}
                aria-current="page"
              >
                {lang}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="w-full max-w-lg">
        <div className="mb-2 flex justify-between items-center"></div>
        <div className="relative bg-gray-50 border rounded-sm p-4 h-fit">
          <div className="overflow-scroll max-h-full">
            <pre>
              <code
                id="code-block"
                className={`text-sm text-gray-700 whitespace-pre ${sourceCode.className}`}
              >
                {language === "python" ? codeString : jsCodeString}
              </code>
            </pre>
          </div>
          <div className="absolute top-2 end-2 bg-gray-50">
            <button
              onClick={copyToClipboard}
              className="text-gray-900 dark:text-gray-400 m-0.5 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-md py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
            >
              {!copied ? (
                <span className="inline-flex items-center">
                  <svg
                    className="w-3 h-3 me-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                  </svg>
                  <span
                    className={`text-xs font-semibold ${patrick.className} uppercase`}
                  >
                    Copy
                  </span>
                </span>
              ) : (
                <span className="inline-flex items-center">
                  <svg
                    className="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                  <span
                    className={`text-xs font-semibold ${patrick.className} uppercase text-blue-700 dark:text-blue-500`}
                  >
                    Copied
                  </span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
