import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "hiro8ma - Portfolio",
  description: "hiro8maのポートフォリオサイト",
  openGraph: {
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
