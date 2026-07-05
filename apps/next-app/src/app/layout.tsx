import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Fira_Code } from "next/font/google";
import { siteConfig } from "@/lib/config/site";
import { AppProvider } from "@/lib/providers/app-provider";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${firaCode.variable}`}>
      <body className="min-h-full flex flex-col bg-[#050816] text-slate-50">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
