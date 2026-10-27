import type { Metadata } from "next";
import { Onest, Syne, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { buildOrganizationGraph } from "@/lib/jsonld";
import { AfiChatDock } from "@/components/chat/AfiChatDock";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    // Halaman dalam cukup mengisi judulnya sendiri; suffix ditambahkan otomatis.
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Variabel font dipasang di <html>, bukan <body>. Token --font-heading
    // dkk. dideklarasikan di :root dan merujuk var(--font-syne); kalau
    // variabel font-nya baru ada di <body>, substitusi di :root menghasilkan
    // nilai kosong — dan kekosongan itu yang diwariskan ke seluruh halaman.
    <html
      lang={site.lang}
      className={`${onest.variable} ${syne.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">
        {children}
        <AfiChatDock />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationGraph()),
          }}
        />
      </body>
    </html>
  );
}
