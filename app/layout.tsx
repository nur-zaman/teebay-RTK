"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Provider } from "react-redux";
import { store } from "@/store";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "TEEBAY",
//   description: "RENT/BUY PRODUCT AT EASE",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
