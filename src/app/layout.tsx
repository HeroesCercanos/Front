import type { Metadata } from "next";
import { Libre_Franklin, Yaldevi } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ReportFloatingButton } from "@/components/common/ReportFloatingButton";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";


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
        <AuthProvider>
          <Header />
          <Navbar />

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#fff8e7",
                color: "#3a2c1a",
                borderRadius: "1rem",
                padding: "12px 16px",
                border: "1px solid #facc15",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              },
            }}
          />

          {children}
          <ReportFloatingButton />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
