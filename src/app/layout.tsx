import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nothing Bot | , Music & Fun",
  description: "The ultimate Discord bot for your server. !",
  keywords: ["discord bot", "discord music bot"],
  authors: [{ name: "bre4d" }],
  creator: "bre4d",
  openGraph: {
    title: "Discord Bot | Powerful Moderation, Music & Fun",
    description: "The ultimate Discord bot for your server.. Elevate your Discord server experience today!",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discord Bot |, Music & Fun",
    description: "The ultimate Discord bot for your server. Powerful , music player.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
