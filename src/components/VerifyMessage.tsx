"use client";

import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { keccak256 } from "js-sha3";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const verifyMessage = async ({ message, address, signature }: any) => {
  try {
    const signerAddr = ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default function VerifyMessage() {
  const [error, setError] = useState<string>();
  const [successMsg, setSuccessMsg] = useState<string>();
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
        // console.log("HASH", hash);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleVerification = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setSuccessMsg("");
    setError("");
    const isValid = await verifyMessage({
      setError,
      // message: data.get("message"),
      message: messageHash,
      address: data.get("address"),
      signature: data.get("signature"),
    });

    if (isValid) {
      setSuccessMsg("Signature is valid!");
    } else {
      setError("Invalid signature");
    }
  };

  return (
    <form className="m-4" onSubmit={handleVerification}>
      <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Verify signature
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
            <div className="my-3">
              <textarea
                required
                name="signature"
                className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                placeholder="Signature"
              />
            </div>
            <div className="my-3">
              <input
                required
                type="text"
                name="address"
                className="textarea w-full input input-bordered focus:ring focus:outline-none"
                placeholder="Signer address"
              />
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
            Verify signature
          </button>
        </footer>
        <div className="p-4 mt-4">
          <ErrorMessage message={error} />
          <SuccessMessage message={successMsg} />
        </div>
      </div>
    </form>
  );
}
