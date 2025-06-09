import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { LiteFooter } from "@/components/LiteFooter";
import { Bebas_Neue, Patrick_Hand } from "next/font/google";

const tenor = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const patrick = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

const postUrl = "";

const markdownComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#005430]">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold mt-6 mb-3 text-[#005430]">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-semibold mt-6 mb-3 text-[#005430]">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 text-foreground leading-relaxed">{children}</p>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="text-blue-500 hover:underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="mb-4 pl-6 list-disc space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="mb-4 pl-6 list-decimal space-y-2">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-foreground">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-[#005430] pl-4 my-6 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
      {children}
    </pre>
  ),
};

async function getBlogPost() {
  try {
    const response = await fetch(postUrl, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return {
      title: "Google Drive as a Content Management System",
      summary: "Maybe Google Drive can be a good, early-stage CMS?",
      date: "June 5th, 2025",
      author: "Sean McClure",
      readingTime: "3 min read",
      tags: ["CMS", "Google Drive", "Development"],
      content: data.content,
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export default async function BlogPostPage() {
  const post = await getBlogPost();

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="pt-16 relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative pb-8">
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
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium bg-[#e6f2ed] text-[#005430]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {post.title}
          </h1>

          <div className="mt-3 flex items-center">
            <div>
              <p className="text-sm font-medium text-foreground">
                {post.author}
              </p>
              <div className="flex space-x-1 text-xs text-muted-foreground">
                <time dateTime={post.date}>{post.date}</time>
                <span aria-hidden="true">&middot;</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          // @ts-ignore gotta figure out the types here, but it works
          components={markdownComponents}
        >
          {post.content}
        </ReactMarkdown>
      </article>
      <div className="flex flex-col margin-auto items-center gap-4 mt-6">
        <Link href="/">
          <div className="flex flex-row space-x-1">
            <Image
              src="/logo-cropped.svg"
              height={30}
              width={30}
              alt="logo with stars"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            ></Image>
            <div className="items-center">
              <span className={`${patrick.className} text-3xl text-[#005430]`}>
                Jedwal.
              </span>
              <span className={`${tenor.className} text-xl text-[#005430]`}>
                co
              </span>
            </div>
          </div>
        </Link>
        <LiteFooter mt={0}></LiteFooter>
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const post = await getBlogPost();
  if (!post) {
    return {
      title: "Post Not Found | Jedwal",
    };
  }

  return {
    title: `${post.title} | Jedwal`,
    description: post.summary,
    openGraph: {
      title: `${post.title} | Jedwal`,
      description: post.summary,
      type: "article",
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: "https://jedwal.co/jedwal-og.png",
          width: 1200,
          height: 630,
          alt: "Jedwal - REST APIs from Google Sheets",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Jedwal`,
      description: post.summary,
      images: ["https://jedwal.co/jedwal-og.png"],
    },
  };
}
