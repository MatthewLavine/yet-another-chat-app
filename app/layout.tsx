import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import HomeButton from "@/app/ui/home-button";

export const metadata: Metadata = {
  title: "Yet Another Chat App",
  description: "A react chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main>
          <HomeButton />
          <div className="flex h-screen flex-col items-center justify-between p-24">
            <div className="flex w-full max-w-5xl flex-grow flex-col items-center justify-between gap-5 overflow-hidden font-mono text-sm">
              <h1 className="text-3xl font-medium">Yet Another Chat App</h1>
              <div className="flex min-h-72 w-full flex-grow flex-col">
                {children}
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
