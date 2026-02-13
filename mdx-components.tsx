import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-slate-200 mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-slate-200 mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-slate-200 mt-4 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-slate-400 mb-4 leading-relaxed">{children}</p>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-violet-400 hover:text-violet-300 underline">
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-slate-400 mb-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-slate-400 mb-4 space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li className="text-slate-400">{children}</li>,
    code: ({ children }) => (
      <code className="bg-slate-800 text-violet-300 px-1.5 py-0.5 rounded text-sm">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-violet-500 pl-4 italic text-slate-500 mb-4">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
