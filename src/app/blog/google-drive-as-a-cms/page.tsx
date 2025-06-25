import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { LiteFooter } from "@/components/LiteFooter";
import { markdownComponents, Bebas, Patrick } from "../components";

async function getBlogPostData() {
  try {
    const response = await fetch(
      "https://api.jedwal.co/doc/117187395759203962885/tempered-actuary"
    );
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    return null;
  }
}


export default async function BlogPostPage() {
  const post = await getBlogPostData();

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
            {post.tags?.map((tag: any) => (
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
              <span className={`${Patrick.className} text-3xl text-[#005430]`}>
                Jedwal.
              </span>
              <span className={`${Bebas.className} text-xl text-[#005430]`}>
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
  const post = await getBlogPostData();
  if (!post) {
    return {
      title: "Post Not Found | Jedwal",
    };
  }

  return {
    title: `${post.title} | Jedwal`,
    description: "Maybe Google Drive can be a good, early-stage CMS?",
    openGraph: {
      title: `${post.title} | Jedwal`,
      description: "Maybe Google Drive can be a good, early-stage CMS?",
      type: "article",
      authors: [post.author],
      tags: ["CMS", "Google Drive", "Development", "Google Drive as a CMS"],
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
      description: "Maybe Google Drive can be a good, early-stage CMS?",
      images: ["https://jedwal.co/jedwal-og.png"],
    },
  };
}
