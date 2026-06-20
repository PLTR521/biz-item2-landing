import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Decision AI — 구매 결정을 완결합니다",
  description:
    "유튜브, 블로그, 다나와를 다 돌아다녀도 결론이 없다면? 예산·용도 입력 → AI 비교표 + 추천 이유 + PDF까지. 결정을 끝내드립니다.",
  openGraph: {
    title: "Decision AI — 구매 결정을 완결합니다",
    description:
      "유튜브, 블로그, 다나와를 다 돌아다녀도 결론이 없다면? 예산·용도 입력 → AI 비교표 + 추천 이유 + PDF까지.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${inter.variable} font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
