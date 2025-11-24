import type { Metadata } from "next";

import {Montserrat} from 'next/font/google';

import  "@/app/globals.css";
import Header from "./ui/header";
import Footer from "./ui/footer";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({ subsets: ['latin']});

export const metadata: Metadata = {
  title: "Tierlist Filmes - Base inicial",
  description: "Protótipo simples de tierlist de filmes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <Header />
        {children}
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
