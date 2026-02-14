import Link from "next/link";
import { Pencil, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug, getAdjacentPosts, calculateReadingTime } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import { useMDXComponents } from "../../../../mdx-components";

const siteUrl = "https://hiro8ma.github.io/portfolio";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const postUrl = `${siteUrl}/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: "Hiroyuki Masuda" }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: "Hiroyuki Masuda Portfolio",
      publishedTime: post.date,
      authors: ["Hiroyuki Masuda"],
      tags: post.tags,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@hir08ma",
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const { prev, next } = getAdjacentPosts(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  const postUrl = `${siteUrl}/blog/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Hiroyuki Masuda",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Hiroyuki Masuda",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.tags?.join(", "),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${readingTime}M`,
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-400">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-6 py-12 md:px-12 md:py-20">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="text-violet-400 hover:text-violet-300"
          >
            Home
          </Link>
          <span className="text-slate-600">/</span>
          <Link
            href="/blog"
            className="text-violet-400 hover:text-violet-300"
          >
            Blog
          </Link>
        </div>

        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <time>{post.date}</time>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {readingTime} min read
            </span>
          </div>
          <h1 className="mt-2 text-4xl font-bold text-slate-200">{post.title}</h1>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-violet-400/10 px-3 py-1 text-xs text-violet-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-invert prose-violet max-w-none">
          <MDXRemote source={post.content} components={useMDXComponents({})} />
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700 flex items-center justify-between">
          <a
            href={`https://github.com/hiro8ma/portfolio/edit/main/content/posts/${slug}.mdx`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400"
          >
            <Pencil size={14} />
            Edit on GitHub
          </a>
        </div>

        <nav className="mt-8 grid grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group rounded-lg border border-slate-700/50 p-4 hover:border-violet-500/50"
            >
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <ChevronLeft size={14} />
                前の記事
              </span>
              <span className="mt-1 block text-sm text-slate-300 group-hover:text-violet-300">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group rounded-lg border border-slate-700/50 p-4 hover:border-violet-500/50 text-right"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-slate-500">
                次の記事
                <ChevronRight size={14} />
              </span>
              <span className="mt-1 block text-sm text-slate-300 group-hover:text-violet-300">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </div>
  );
}
