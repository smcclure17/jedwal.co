import { Patrick_Hand } from "next/font/google";
import { CreateApiForm } from "./CreateApiForm";
import { getUserData } from "@/data/fetching";

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export interface FirstApiSplashProps {
  accountId: string;
}

export const FirstDocSplash = async ({ accountId }: FirstApiSplashProps) => {
  const userResponse = await getUserData(accountId);
  if (userResponse.status !== "logged_in") return <>Something went wrong!</>;

  return (
    <div className="flex margin-auto mt-24 rounded-lg w-fit ">
      <div className="flex flex-col">
        <h1 className={`${patrick.className} text-4xl text-[#005430]`}>
          Welcome to Jedwal CMS, {userResponse.data.display_name}!
        </h1>
        <p>Jedwal turns your Google Docs into CMS Posts.</p>
        <h2 className={`${patrick.className} text-2xl pt-5 text-[#005430]`}>
          Let&apos;s create our first Post
        </h2>
        <p>
          Following the steps below, we&apos;ll create a new Post from a Google
          Doc with sample data.
        </p>
        <ol className="list-decimal space-y-1 pl-4 pt-4">
          <li>
            <a
              href="https://docs.new"
              target="_blank"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex flex-row"
            >
              <span className="pr-2">Create a new Google Document</span>
              <ArrowIcon />
            </a>
          </li>
          <li>
            Give your document a name and add some content. Use different
            headings, lists, etc..
          </li>
          <li>
            <div className="flex flex-col space-y-1.5">
              <span>Copy the Google Doc URL and create your Post</span>
              <CreateApiForm type="doc" label={false} accountId={accountId} />
              <span className="max-w-96 text-xs text-gray-600">
                Important: Once an Post is created, the data in your Google
                Document becomes publicly accessible.{" "}
                <span className="italic">
                  Only use non-sensitive information in your source documents.
                </span>
              </span>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

const GoogleSheetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="25"
    height="25"
    viewBox="0 0 48 48"
  >
    <path
      fill="#43a047"
      d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"
    ></path>
    <path fill="#c8e6c9" d="M40 13L30 13 30 3z"></path>
    <path fill="#2e7d32" d="M30 13L40 23 40 13z"></path>
    <path
      fill="#e8f5e9"
      d="M31,23H17h-2v2v2v2v2v2v2v2h18v-2v-2v-2v-2v-2v-2v-2H31z M17,25h4v2h-4V25z M17,29h4v2h-4V29z M17,33h4v2h-4V33z M31,35h-8v-2h8V35z M31,31h-8v-2h8V31z M31,27h-8v-2h8V27z"
    ></path>
  </svg>
);

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="3"
    stroke="black"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
    />
  </svg>
);
