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
        <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="52f980d9-6576-4679-a4cf-dfc63ab4b558" data-blockingmode="auto" type="text/javascript" />
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
        <script src="https://t.contentsquare.net/uxa/b16f5ad0f2797.js" async />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(A,s,a,y,e,r){
                r=window.OpenReplay=[e,r,y,[s-1]];
                s=document.createElement('script');s.src=A;s.async=!a;
                document.getElementsByTagName('head')[0].appendChild(s);
                r.start=function(v){r.push([0])};
                r.stop=function(v){r.push([1])};
                r.setUserID=function(id){r.push([2,id])};
                r.setUserAnonymousID=function(id){r.push([3,id])};
                r.setMetadata=function(k,v){r.push([4,k,v])};
                r.event=function(k,p,i){r.push([5,k,p,i])};
                r.issue=function(k,p){r.push([6,k,p])};
                r.isActive=function(){return false};
                r.getSessionToken=function(){};
                r.getSessionID=function(){};
              })("//static.openreplay.com/latest/openreplay.js",1,0,"8jaoxbd4jjp2kh0BbByA",44);
            `,
          }}
        />
      </head>
      <body className="font-body">
        {children}
      </body>
    </html>
  );
}
