import type { Metadata } from "next";
import "./../globals.css";

export const metadata: Metadata = {
  title: "ETH Signature",
  description: "Website Digital Signature with Blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}