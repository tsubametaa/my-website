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

export const metadata: Metadata = {
  title: "Alvin Putra - Portfolio",
  description:
    "Portfolio website of Alvin Putra, a passionate backend developer.",
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
