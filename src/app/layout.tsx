import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import TopBar from "@/components/layout/Topbar";

const sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Starter Boilerplate",
  description: "Boilerplate code for nextjs project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <TopBar />
        
        {children}
      </body>
    </html>
  );
}
