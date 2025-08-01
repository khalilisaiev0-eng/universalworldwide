import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gaza Emergency Appeal | Donate Now",
  description: "Help provide urgent assistance to the people in Gaza who are facing humanitarian crisis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main>
          {children}
        </main>
        <footer className="bg-gray-100 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600">© 2024 Gaza Emergency Relief. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
