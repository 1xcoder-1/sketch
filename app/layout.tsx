import type { Metadata } from "next";
import { Geist_Mono, Patrick_Hand, Shantell_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

/* Hand-lettered display + body face. The extra axes carry the bounce/ink wobble
   that makes the sketchbook look, and next/font self-hosts it so there is no
   external request or layout shift while it swaps in. */
const shantell = Shantell_Sans({
  variable: "--font-shantell",
  subsets: ["latin"],
  axes: ["BNCE", "INFM", "SPAC"],
  display: "swap",
});

/* Second hand: all-caps marker labels, stamps and doodle captions. */
const patrickHand = Patrick_Hand({
  variable: "--font-patrick",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://stickitupp.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sketch Up — Stickers for your UI",
    template: "%s | Sketch Up",
  },
  description:
    "Give your website the kind of personality that makes people stick around. A sticker library for React with 3D vinyl hover peel, chrome emblems, and playful vector decals.",
  applicationName: "Sketch Up",
  keywords: [
    "stickers",
    "react stickers",
    "stick-it-up",
    "vinyl peel sticker",
    "holographic sticker",
    "chrome stickers",
    "interactive stickers",
    "react component stickers",
    "svg decals",
    "ui stickers",
    "web animations",
  ],
  authors: [{ name: "Samiran De", url: "https://github.com/Sam721166" }],
  creator: "Samiran De",
  publisher: "Sketch Up",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sketch Up — Stickers for your UI",
    description:
      "Give your website the kind of personality that makes people stick around. A sticker library for React with 3D vinyl peel effects.",
    url: siteUrl,
    siteName: "Sketch Up",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sketch Up — Give your website the kind of personality that makes people stick around.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sketch Up — Stickers for your UI",
    description:
      "Give your website the kind of personality that makes people stick around. A sticker library for React.",
    images: ["/og-image.png"],
    creator: "@samirande",
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
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Sketch Up",
      description: "Delightful React vinyl and holographic stickers for your UI.",
      publisher: {
        "@type": "Person",
        name: "Samiran De",
        url: "https://github.com/Sam721166",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "stick-it-up",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Premium vector, holographic & chrome aesthetic sticker components for React with 3D vinyl peel.",
      url: siteUrl,
      downloadUrl: "https://www.npmjs.com/package/stick-it-up",
    },
  ],
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${shantell.variable} ${patrickHand.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans selection:bg-marker selection:text-ink">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
