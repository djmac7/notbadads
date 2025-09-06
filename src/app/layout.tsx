import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif"
});

export const metadata: Metadata = {
  title: "Not Bad Ads",
  description: "Hand-picked Meta & LinkedIn ads for design & copy inspiration. Curated B2B ads for design & copy inspiration.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Not Bad Ads",
    description: "Hand-picked Meta & LinkedIn ads for design & copy inspiration. Curated B2B ads for design & copy inspiration.",
    images: [
      {
        url: "/ogimage.png",
        width: 1200,
        height: 630,
        alt: "Not Bad Ads - Design & Copy Inspiration",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${instrumentSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
