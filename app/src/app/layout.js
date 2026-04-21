import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import FramerProvider from "@/components/FramerProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "SEL Tiger Roofing Sheets",
    template: "%s | SEL Tiger Roofing Sheets",
  },
  description: "SEL Tiger Roofing Sheets Website built for Shyam Metalics",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="root-layout">
        <FramerProvider>
          <Header />
          <main className="main">{children}</main>
        </FramerProvider>
      </body>
    </html>
  );
}
