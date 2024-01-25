"use client";

import { useState, useRef } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";

const signMessage = async ({ setError, message }: any) => {
  try {
    console.log({ message });
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    if (!message) {
      throw new Error("Message is undefined");
    }

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address,
    };
  } catch (err: any) {
    setError(err.message);
  }
};

export default function SignMessage() {
  const resultBox = useRef();
  const [signatures, setSignatures] = useState<any>([]);
  const [error, setError] = useState<any>();

  const handleSign = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if (e.target !== null) {
      const data = new FormData(e.target);
      setError("");
      const sig = await signMessage({
        setError,
        message: data.get("message")?.toString(),
      });
      if (sig) {
        setSignatures([...signatures, sig]);
      }
    }
  };

  return (
    <form className="m-4" onSubmit={handleSign}>
      <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Sign messages
          </h1>
          <div className="">
            <div className="my-3">
              <textarea
                required
                // type="text"
                name="message"
                className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                placeholder="Message"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary btn-block uppercase text-white"
          >
            Sign message
          </button>
          <ErrorMessage message={error} />
        </footer>
        {signatures.map((sig: any, idx: number) => {
          return (
            <div className="p-2" key={sig}>
              <div className="my-3">
                <p>
                  Message {idx + 1}: {sig.message}
                </p>
                <p>Signer: {sig.address}</p>
                <textarea
                  // type="text"
                  readOnly
                  ref={resultBox.current}
                  className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                  placeholder="Generated signature"
                  value={sig.signature}
                />
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}
