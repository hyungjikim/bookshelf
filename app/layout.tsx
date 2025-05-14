import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const ibmPlexSansKR = IBM_Plex_Sans_KR({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "모두의 책장",
  description: "📚 책장을 함께 가꿔보아요",
  metadataBase: new URL("https://bookshelf-by-hyungji.vercel.app"),
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${ibmPlexSansKR.className} `}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
