import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/Gsap";
import { contact, faq, meta, siteUrl } from "@/content";
import "./globals.css";

// Self-hosted (OFL) so builds never depend on reaching Google Fonts.
const sans = localFont({
  src: "../fonts/inter-tight-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter-tight",
});
const serif = localFont({
  // Only the italic cut is ever used on the page.
  src: [{ path: "../fonts/instrument-serif-latin-400-italic.woff2", style: "italic" }],
  weight: "400",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  authors: [{ name: "Raktim Yoddha" }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Raktim Yoddha",
    title: meta.title,
    description: meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
};

export const viewport: Viewport = { themeColor: "#fffef2" };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Raktim Yoddha",
      jobTitle: "Product Designer & Developer",
      url: siteUrl,
      image: `${siteUrl}/mypic.webp`,
      email: `mailto:${contact.email}`,
      address: { "@type": "PostalAddress", addressRegion: "Gujarat", addressCountry: "IN" },
      sameAs: [contact.youtube, contact.twitch, contact.github],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Raktim Yoddha",
      url: siteUrl,
      description: meta.description,
      founder: { "@id": `${siteUrl}/#person` },
      areaServed: "Worldwide",
      address: { "@type": "PostalAddress", addressRegion: "Gujarat", addressCountry: "IN" },
      serviceType: ["Web design", "Web development", "App development", "Business automation", "AI chatbots", "Local SEO", "Cold outreach"],
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <body>
        {/* Lets CSS hide split text only when JS will reveal it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
