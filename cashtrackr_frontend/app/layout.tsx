import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cashtrackr",
  description: "Your personal finance tracker for managing cash flow and expenses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={outfit.className}>
        {children}
      </body>
    </html>
  );
}
