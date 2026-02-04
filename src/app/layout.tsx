import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./components/language/switch-lang";
import BackToTop from "./components/home/ui/back-to-top";
import SecurityProvider from "./components/security/SecurityProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import JsonLd from "./components/JsonLd";

export const metadata: Metadata = {
  title: {
    default: "Alvin Putra - Portfolio | Web Portfolio",
    template: "%s | Alvin Putra",
  },
  description: "Website Portfolio Alvin Putra.",
  keywords: [
    "Alvin Putra",
    "Mahasiswa UNAS",
    "Sistem Informasi UNAS",
    "Backend Developer Jakarta",
    "Portfolio Web Developer",
    "Universitas Nasional",
    "Alvin Unas",
    "Unas",
    "Unas 2023",
  ],
  authors: [{ name: "Alvin Putra", url: "https://utaaa.my.id" }],
  creator: "Alvin Putra",
  publisher: "Alvin Putra",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://utaaa.my.id"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Alvin Putra - Portfolio",
    description: "Web Portfolio Alvin Putra.",
    url: "https://utaaa.my.id",
    siteName: "Alvin Putra Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvin Putra - Portfolio",
    description: "Web Portfolio Alvin Putra.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd />
        <SecurityProvider
          enableScriptProtection={true}
          enableDOMProtection={true}
          enableClipboardProtection={true}
        >
          <LanguageProvider>
            {children}
            <BackToTop />
          </LanguageProvider>
        </SecurityProvider>
      </body>
    </html>
  );
}
