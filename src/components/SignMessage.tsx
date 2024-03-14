"use client";

import { useState, useRef } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import { keccak256 } from "js-sha3";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

type Signature =
  | {
      message: string;
      signature: string;
      address: string;
    }
  | undefined;

const signMessage = async ({ setError, message }: any) => {
  try {
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
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [error, setError] = useState<string>();
  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);
  const [messageHash, setMessageHash] = useState<string>();

  const handleInput = (e: React.ChangeEvent<any>) => {
    e.target.files?.length && setSelectedDocs(Array.from(e.target.files));

    if (e.target.files?.length) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const arrayBuffer = reader.result!;
        const hash = keccak256(arrayBuffer);
        setMessageHash(hash);
        // console.log("HASH: ", hash);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSign = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if (selectedDocs.length) {
      // const data = new FormData(e.target);
      setError("");
      const sig: Signature = await signMessage({
        setError,
        // message: data.get("message")?.toString(),
        message: messageHash,
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
              {/* MESSAGE WITH TEXT */}
              {/* <textarea
                  required
                  // type="text"
                  name="message"
                  className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                  placeholder="Message"
                /> */}

              {/* MESSAGE WITH FILE */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">Pilih dokumen</span>
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleInput}
                  className="file-input file-input-bordered file-input-primary file-input-sm w-full text-gray-400 text-sm"
                />
              </label>
            </div>
          </div>
        </main>

        {/* PDF VIEWER */}
        <DocViewer
          documents={selectedDocs.map((file) => ({
            uri: window.URL.createObjectURL(file),
            fileName: file.name,
          }))}
          pluginRenderers={DocViewerRenderers}
        />
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