"use client";

import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HistoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const { user } = UserAuth();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      router.push("/login");
    }
  }, [router, user]);

  return <main className="min-h-screen bg-base-200">{children}</main>;
}
