import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono, Noto_Sans_TC, Kaushan_Script } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Loader } from "@/components/layout/Loader";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { site, socials } from "@/data/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const notoTC = Noto_Sans_TC({
  weight: ["300", "400", "500", "700"],
  preload: false,
  variable: "--font-noto-tc",
  display: "swap",
});
const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
});
const script = Kaushan_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script-face",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-code", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: site.titleTemplate },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  affiliation: { "@type": "CollegeOrUniversity", name: site.school },
  sameAs: socials.filter((s) => s.href.startsWith("https://")).map((s) => s.href),
};

// Mark repeat visits before first paint so the CSS intro is skipped.
const seenScript = `try{var s=sessionStorage;if(s.getItem("qy-seen"))document.documentElement.setAttribute("data-seen","");else s.setItem("qy-seen","1")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={site.locale}
      className={`${inter.variable} ${notoTC.variable} ${serif.variable} ${script.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: seenScript }} />
      </head>
      <body>
        <Loader />
        <a
          href="#main"
          className="sr-only z-[90] rounded-full bg-gold px-4 py-2 font-mono text-xs text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <ScrollProgress />
          <Header />
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 hidden md:block">
            <div className="shell grid h-full grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`border-l border-white/[0.035] ${i === 3 ? "border-r" : ""}`} />
              ))}
            </div>
          </div>
          <div className="relative z-10">
            <main id="main">{children}</main>
            <Footer />
          </div>
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
