import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "../lib/redux/provider";
import HeaderWrapper from "@/components/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script"; // ✅ Required for GTM

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
    images:
      "https://res.cloudinary.com/dcycgqmut/image/upload/v1745231815/R2M/Banner/l4rdswgpoagw4ligpmaw.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* ✅ GTM HEAD SCRIPT */}
      <Script id="gtm-head" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MD47XS64');
        `}
      </Script>

      <body>
        {/* ✅ GTM NOSCRIPT (for users without JS) */}
         <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MD47XS64"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

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
