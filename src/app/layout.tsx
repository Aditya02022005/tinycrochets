import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiny Crochets",
  description: "Handmade crochet creations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.className} min-h-full bg-[#f8f3ed]`}>
        <Navbar />

        {children}
         <Toaster
  richColors
  position="top-right"
/>
      </body>
     
    </html>
    
  );
}
