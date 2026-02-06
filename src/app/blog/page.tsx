import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-12 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300"
          >
            <ArrowLeft size={16} />
            Home
          </Link>
          <span className="text-slate-500 text-sm">hiro8ma.github.io/portfolio</span>
        </div>

        <h1 className="text-4xl font-bold text-slate-200 mb-8">Blog</h1>

        {posts.length === 0 ? (
          <p className="text-slate-500">No posts yet. Check back soon!</p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-lg border border-slate-700/50 bg-slate-800/30 p-6 transition-all hover:border-teal-500/50 hover:bg-slate-800/50"
                >
                  <time className="text-sm text-slate-500">{post.date}</time>
                  <h2 className="mt-2 text-xl font-semibold text-slate-200 group-hover:text-teal-300">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-slate-400">{post.description}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
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
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
