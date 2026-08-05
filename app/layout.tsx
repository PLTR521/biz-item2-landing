import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const TITLE =
  "Email Deliverability — the pre-send deliverability check API";
// 카피 포지셔닝과 일치시킨다: 블록리스트에 오른 발송 IP가 먼저, 인증이 나중.
// 측정하지 않는 것(inbox placement)을 설명에서도 밝힌다.
const DESCRIPTION =
  "One request before the send: the sending IPs behind your domain checked against Spamhaus ZEN, Barracuda and SpamCop, plus live SPF, DKIM and DMARC records. It does not measure inbox placement — nothing running before the send can. Works alongside Resend, SendGrid and Postmark.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
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
