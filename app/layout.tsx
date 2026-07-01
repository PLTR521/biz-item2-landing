import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SendGuard AI — Deliverability infrastructure for AI agents",
  description:
    "Your AI agent's emails are landing in spam. Deliverability infrastructure built for autonomous senders — not humans with a send button.",
  openGraph: {
    title: "SendGuard AI — Deliverability infrastructure for AI agents",
    description:
      "Deliverability infrastructure built for autonomous senders — not humans with a send button.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
