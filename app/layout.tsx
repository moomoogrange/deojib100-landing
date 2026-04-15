import type { Metadata } from "next";
import {
  Noto_Serif_KR,
  Noto_Sans_KR,
  Cormorant_Garamond,
} from "next/font/google";

const notoSerif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "더집100 — 원데이 집 만들기 워크숍",
  description:
    "자유롭게 상상하고, 손으로 짓는 하루. 5월 2일(금) 원데이 집 만들기 워크숍. 정원 7명.",
  openGraph: {
    title: "더집100 — 원데이 집 만들기 워크숍",
    description: "함께 짓는 백 년의 집. 5월 2일(금) 10:30~12:30 | 참가비 10,000원",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${notoSerif.variable} ${notoSans.variable} ${cormorant.variable}`}
    >
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
