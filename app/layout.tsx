import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Review, WithContext } from "schema-dts";
import Script from "next/script";

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

const jsonLd: WithContext<Review> = {
  "@context": "https://schema.org",
  "@type": "Review",
  name: "모두의 책장",
  description: "책 감상문 아카이브",
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
        <Script
          id="jsonLd"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
