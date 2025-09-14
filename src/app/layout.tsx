import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import StoreProvider from "./providers/StoreProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Artrum",
  description: "С заботой о цифровом исскустве для исскуства",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="ru" data-scroll-behavior="smooth">
        <head>
          <link rel="icon.svg" href="/icon" type="image/svg+xml" />
        </head>
        <body className={`${roboto.variable}`}>{children}</body>
      </html>
    </StoreProvider>
  );
}
