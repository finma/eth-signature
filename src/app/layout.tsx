"use client";

// import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "@/context/AuthContext";

// export const metadata: Metadata = {
//   title: "ETH Signature",
//   description: "Website Digital Signature with Blockchain",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <AuthContextProvider>
        <body>{children}</body>
      </AuthContextProvider>
    </html>
  );
}
