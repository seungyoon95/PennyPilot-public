import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import RootProviders from "@/components/providers/RootProviders";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PennyPilot",
  description: "Budget Tracker built with NextJS",
};

export default function RootLayout({children, }: Readonly<{children: React.ReactNode}>) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning
        lang="en"
        className="light"
        style={{
          colorScheme: "light"
        }}
      >
        <body className={inter.className}>
          <Toaster richColors position="bottom-right" />
          <RootProviders>
            {children}
          </RootProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
