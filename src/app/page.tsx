import NavBar from "@/components/NavBar";
import SignMessage from "@/components/SignMessage";
import { Tab, Tabs } from "@/components/Tabs";
import VerifyMessage from "@/components/VerifyMessage";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex flex-wrap min-h-screen bg-base-200">
        <Tabs>
          <Tab label="Sign Message">
            <SignMessage />
          </Tab>
          <Tab label="Verify Message">
            <VerifyMessage />
          </Tab>
        </Tabs>
      </main>
    </>
  );
}
