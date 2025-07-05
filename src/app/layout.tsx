import type { Metadata } from "next";
import { Libre_Franklin, Yaldevi } from "next/font/google";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
  weight: ["600", "700"],
  display: "swap",
});

const yaldevi = Yaldevi({
  subsets: ["latin"],
  variable: "--font-yaldevi",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Héroes Cercanos",
  description: "webpt25b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${libreFranklin.variable} ${yaldevi.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
