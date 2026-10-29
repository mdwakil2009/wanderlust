import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wanderlust | Luxury Travel & Curated Adventures",
  description:
    "Explore breathtaking destinations and create unforgettable memories with our curated luxury travel experiences.",
  keywords: [
    "travel",
    "luxury travel",
    "destinations",
    "wanderlust",
    "adventure",
    "vacations",
  ],
  authors: [{ name: "Wanderlust Travel" }],
  openGraph: {
    title: "Wanderlust | Luxury Travel & Curated Adventures",
    description:
      "Explore breathtaking destinations and create unforgettable memories with our curated luxury travel experiences.",
    url: "https://wanderlust.com",
    siteName: "Wanderlust",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${josefinSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        {children}
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
