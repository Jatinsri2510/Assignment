import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Artistly.com - Performing Artist Booking Platform",
  description: "Connect with talented performing artists for your events. Browse singers, dancers, speakers, and DJs. Book the perfect performer for your next event.",
  keywords: "performing artists, event booking, singers, dancers, speakers, DJs, entertainment",
  authors: [{ name: "Artistly.com" }],
  openGraph: {
    title: "Artistly.com - Performing Artist Booking Platform",
    description: "Connect with talented performing artists for your events",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
