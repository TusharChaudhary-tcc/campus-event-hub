import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campus Event Hub",
  description:
    "College club event management — browse events, register, and run the club calendar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${orbitron.variable} h-full antialiased dark`}
    >
      {/* Set the deep dark mode canvas globally and added a custom selection color */}
      <body className="flex min-h-full flex-col bg-gray-950 text-gray-50 font-sans selection:bg-cyan-500/30">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}