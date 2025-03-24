import type { Metadata } from "next";
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Geist, Geist_Mono } from "next/font/google";
import BootstrapClient from './components/BootstrapClient';
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer /> 
        <BootstrapClient /> {/* Inicializa bootstrap */}
      </body>
    </html>
  );
}
