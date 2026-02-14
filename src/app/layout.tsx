import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://hiro8ma.github.io/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hiroyuki Masuda | Engineering Manager & Architect",
    template: "%s | Hiroyuki Masuda",
  },
  description:
    "Engineering Manager & Architect with 10+ years experience. Go, Kubernetes, GCP, AI/ML. Building scalable systems and leading engineering teams.",
  keywords: [
    "Hiroyuki Masuda",
    "増田 浩之",
    "増田浩之",
    "hiro8ma",
    "Engineering Manager",
    "Software Architect",
    "Go",
    "Kubernetes",
    "GCP",
    "Google Cloud",
    "AI",
    "Machine Learning",
    "Microservices",
  ],
  authors: [{ name: "Hiroyuki Masuda", url: siteUrl }],
  creator: "Hiroyuki Masuda",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Hiroyuki Masuda Portfolio",
    title: "Hiroyuki Masuda | Engineering Manager & Architect",
    description:
      "Engineering Manager & Architect with 10+ years experience. Go, Kubernetes, GCP, AI/ML.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Hiroyuki Masuda - Engineering Manager & Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiroyuki Masuda | Engineering Manager & Architect",
    description:
      "Engineering Manager & Architect with 10+ years experience. Go, Kubernetes, GCP, AI/ML.",
    creator: "@hir08ma",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hiroyuki Masuda",
              alternateName: ["hiro8ma", "増田 浩之", "増田浩之"],
              url: siteUrl,
              jobTitle: "Engineering Manager & Architect",
              worksFor: {
                "@type": "Organization",
                name: "CANARY",
              },
              sameAs: [
                "https://github.com/hiro8ma",
                "https://www.linkedin.com/in/hiro8ma/",
                "https://x.com/hir08ma",
              ],
              knowsAbout: [
                "Go",
                "Kubernetes",
                "Google Cloud Platform",
                "Microservices",
                "AI/ML",
                "Engineering Management",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
