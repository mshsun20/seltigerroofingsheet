import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavbarProvider from "@/context/NavbarContext";
import FramerProvider from "@/components/common/FramerProvider";
// import Router from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Prevent Font Awesome from automatically adding CSS
config.autoAddCss = false;

export const metadata = {
  title: {
    default: "SEL Tiger Roofing Sheets",
    template: "%s | SEL Tiger Roofing Sheets",
  },
  description: "SEL Tiger Roofing Sheets Website built for Shyam Metalics",
  icons: {
    icon: `/favicon.png`,
    shortcut: `/favicon.png`,
    apple: `/favicon.png`,
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="root-layout">
        <NavbarProvider>
          <FramerProvider>
            <Header />
            <main className="main">
              {children}
            </main>
            <Footer />
          </FramerProvider>
        </NavbarProvider>
      </body>
    </html>
  );
}
