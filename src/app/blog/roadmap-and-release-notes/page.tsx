import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Release Notes and Roadmap | Jedwal",
  description:
    "Tracking our progress and upcoming features for Jedwal. See what we've delivered, what we're working on, and what's on our roadmap.",
  openGraph: {
    title: "Release Notes and Roadmap | Jedwal",
    description:
      "Tracking our progress and upcoming features for Jedwal. See what we've delivered, what we're working on, and what's on our roadmap.",
    type: "article",
    publishedTime: "2025-03-13T00:00:00Z",
    authors: ["Sean McClure"],
    tags: ["Updates", "Features", "Product", "Roadmap"],
    images: [
      {
        url: "https://jedwal.co/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Jedwal - REST APIs from Google Sheets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Release Notes and Roadmap | Jedwal",
    description:
      "Tracking our progress and upcoming features for Jedwal. See what we've delivered, what we're working on, and what's on our roadmap.",
    images: ["https://jedwal.co/og-image.jpeg"],
  },
};

const blogPost = {
  id: "1",
  title: "Release Notes and Roadmap",
  summary: "Tracking our progress and features we plan to add.",
  date: "March 13, 2025",
  author: "Sean McClure",
  authorImage: "/splash.png",
  readingTime: "2 min read",
  tags: ["Updates", "Features", "Product"],
};

export default function RoadmapBlogPost() {
  return (
    <div className="min-h-screen">
      <div className="pt-16 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative pb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-[#005430] hover:text-[#005430]/80 mb-6 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to all posts
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {blogPost.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium bg-[#e6f2ed] text-[#005430]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {blogPost.title}
          </h1>

          <div className="mt-3 flex items-center">
            <div className="">
              <p className="text-sm font-medium text-foreground">
                {blogPost.author}
              </p>
              <div className="flex space-x-1 text-xs text-muted-foreground">
                <time dateTime={blogPost.date}>{blogPost.date}</time>
                <span aria-hidden="true">&middot;</span>
                <span>{blogPost.readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <h2 className="text-2xl font-semibold mb-4 text-[#005430]">
          Introduction
        </h2>
        <p className="mb-4">
          We have a lot to get done, but we're chipping away. Here's what we've
          delivered, what we're working on, and what to expect down the road.
        </p>
        <p className="mb-4">
          We love feedback--If you have any features you'd like to see, please{" "}
          <a
            className="text-blue-500 hover:underline"
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSf-XVMrOj9t6e-Tr4ECyR4jhob9nKlPP9inDbnf4uwxvd_Fsw/viewform"
          >
            fill out our Google Form.
          </a>
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#005430]">
          The Timeline
        </h2>
        <RoadmapTimeline />
      </article>
    </div>
  );
}
