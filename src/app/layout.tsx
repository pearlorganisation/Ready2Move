import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import { ReduxProvider } from "../lib/redux/provider";
import HeaderWrapper from "@/components/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import { Sidebar } from "@/components/sidebar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Ready2Move",
  description: "Created By Pearl",
  openGraph: {
    title: 'Ready2Move',
    description: 'Best Buying and Rental Properties',
    url: 'https://ready2move.co.in/',
    siteName: 'Ready2Move',
    locale: 'en_US',
    type: 'website',
    images: "https://res.cloudinary.com/dcycgqmut/image/upload/v1745231815/R2M/Banner/l4rdswgpoagw4ligpmaw.jpg"
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
        <ReduxProvider>
          <HeaderWrapper />
          <main>{children}</main>
          <FooterWrapper />
          <ToastContainer position="top-right" autoClose={3000} />
        </ReduxProvider>
      </body>
    </html>
  );
}
