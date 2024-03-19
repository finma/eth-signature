export default function HistoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="min-h-screen bg-base-200">{children}</main>;
}
