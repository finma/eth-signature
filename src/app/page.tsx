import SignMessage from "@/components/SignMessage";
import VerifyMessage from "@/components/VerifyMessage";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-wrap min-h-screen">
      <div className="w-full lg:w-1/2">
        <SignMessage />
      </div>
      <div className="w-full lg:w-1/2">
        <VerifyMessage />
      </div>
    </main>
  );
}
