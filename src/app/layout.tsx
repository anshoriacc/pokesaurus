import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Pokésaurus",
    default: "Pokésaurus",
  },
  description: "Pokésaurus built with Next.js and TailwindCSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "overflow-x-hidden bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 [&_*]:box-border",
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
