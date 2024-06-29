import "@/app/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import MenuBar from "@/app/ui/menu-bar";
import Rooms from "@/app/ui/rooms";
import RoomsSkeleton from "@/app/ui/rooms-skeleton";
import { Suspense } from "react";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class">
          <main>
            <div className="flex h-screen flex-row">
              <MenuBar />
              <div className="h-screen flex-grow">{children}</div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
