import NavBar from "@/components/NavBar";
import SignMessage from "@/components/SignMessage";
import { Tab, Tabs } from "@/components/Tabs";
import VerifyMessage from "@/components/VerifyMessage";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex flex-wrap min-h-screen bg-base-200">
        <Tabs>
          <Tab label="Sign Document">
            <SignMessage />
          </Tab>
          <Tab label="Verify Document">
            <VerifyMessage />
          </Tab>
        </Tabs>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />
    </>
  );
}
