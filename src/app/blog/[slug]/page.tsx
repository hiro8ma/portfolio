import Link from "next/link";
import { Pencil } from "lucide-react";
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
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="text-teal-400 hover:text-teal-300"
          >
            Home
          </Link>
          <span className="text-slate-600">/</span>
          <Link
            href="/blog"
            className="text-teal-400 hover:text-teal-300"
          >
            Blog
          </Link>
        </div>

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

        <div className="mt-12 pt-8 border-t border-slate-700">
          <a
            href={`https://github.com/hiro8ma/portfolio/edit/main/content/posts/${slug}.mdx`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-400"
          >
            <Pencil size={14} />
            Edit on GitHub
          </a>
        </div>
      </article>
    </div>
  );
}
