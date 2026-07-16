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
  title:
    "SendGuard AI — The deliverability check API for multi-tenant SaaS",
  description:
    "Catch domain reputation problems before your AI agents burn your reputation. One HTTP call before your ESP sends. Complements Resend, SendGrid, and Postmark.",
  openGraph: {
    title:
      "SendGuard AI — The deliverability check API for multi-tenant SaaS",
    description:
      "Catch domain reputation problems before your AI agents burn your reputation. One HTTP call before your ESP sends.",
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
