import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "SendGuard AI — Deliverability API for AI agents",
  description:
    "Check any domain's reputation and safe send volume with one API call — built for bursty, event-driven agent traffic.",
  openGraph: {
    title: "SendGuard AI — Deliverability API for AI agents",
    description:
      "Check any domain's reputation and safe send volume with one API call — built for bursty, event-driven agent traffic.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
