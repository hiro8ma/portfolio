import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-400">
      <article className="mx-auto max-w-3xl px-6 py-12 md:px-12 md:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-8"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <header className="mb-8">
          <time className="text-sm text-slate-500">{post.date}</time>
          <h1 className="mt-2 text-4xl font-bold text-slate-200">{post.title}</h1>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-teal-400/10 px-3 py-1 text-xs text-teal-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-invert prose-teal max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  );
}
