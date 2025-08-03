import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ummah Emergency Appeal | Donate Now",
  description: "Help provide urgent assistance to Muslims around the world who are facing humanitarian crises",
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
        <footer className="bg-[#f3fcff] py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <Image src="/images/islam.png" alt="Islam Logo" width={100} height={100} />
                </div>
                <div className="flex space-x-6">
                  <Link href="/privacy-policy" className="text-gray-700 hover:text-blue-600">Privacy Policy</Link>
                  <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact Us</Link>
                  <Link href="/terms" className="text-gray-700 hover:text-blue-600">Terms of Use</Link>
                </div>
              </div>
              <p className="text-gray-600 text-center">© 2024 Ummah Emergency Relief. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
