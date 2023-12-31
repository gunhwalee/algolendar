import "./globals.css";
import type { Metadata } from "next";
import Logo from "@/components/common/Logo";
import Link from "next/link";
import AuthSession from "@/lib/AuthSession";
import TanstackProvider from "@/lib/TanstackProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Algolendar",
  description: "Generated by ghlee",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AuthSession>
          <TanstackProvider>
            <header className="p-4 bg-header">
              <Link href="/">
                <Logo size={30} />
              </Link>
            </header>
            <main className="h-pageHeight flex bg-background">
              <Navbar />
              {children}
            </main>
          </TanstackProvider>
        </AuthSession>
      </body>
    </html>
  );
}
