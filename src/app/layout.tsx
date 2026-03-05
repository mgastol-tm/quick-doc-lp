import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "QuickDoc — Lekarz online bez wychodzenia z domu",
  description: "Konsultacje medyczne online. Internista, pediatra, psychiatra, konsultacja w sprawie zwolnienia L4. Szybko, wygodnie, bez kolejek.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
        <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="d527c754-16a8-4a01-8d77-b8009211edef" data-culture="PL" data-blockingmode="auto" async />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1JPTVN6VCT" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1JPTVN6VCT');
            `,
          }}
        />
        <script src="https://t.contentsquare.net/uxa/3b3217b57ca5d.js" async />
      </head>
      <body className="font-body">
        {children}
      </body>
    </html>
  );
}
