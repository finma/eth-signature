"use client";

import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { keccak256 } from "js-sha3";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import QrScanner from "qr-scanner";
import Image from "next/image";
import { toast } from "react-toastify";

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
  // const [selectedQRCode, setSelectedQRCode] = useState<File[]>([]);
  const [messageHash, setMessageHash] = useState<string>();
  const [imageQR, setImageQR] = useState<string>();
  const [signature, setSignature] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [btnScan, setBtnScan] = useState<boolean>(true);
  const [stopScan, setStopScan] = useState<boolean>(true);

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

  const handleInputQRCode = (e: React.ChangeEvent<any>) => {
    // e.target.files?.length && setSelectedQRCode(Array.from(e.target.files));

    if (e.target.files?.length) {
      const file = e.target.files[0];

      setImageQR(URL.createObjectURL(file));

      QrScanner.scanImage(file, { returnDetailedScanResult: true })
        .then((result) => {
          const data = JSON.parse(result.data);

          setSignature(data.signature);
          setAddress(data.address);

          // console.log(data);
        })
        .catch((e) => console.log(e));
      // const reader = new FileReader();

      // reader.onload = () => {
      //   const arrayBuffer = reader.result!;
      //   const hash = keccak256(arrayBuffer);
      //   setMessageHash(hash);
      //   // console.log("HASH", hash);
      // };

      // reader.readAsArrayBuffer(file);
    }
  };

  const handleScan = async (isScan: boolean) => {
    setBtnScan(isScan);
    if (isScan) setStopScan(true);
    if (btnScan === false) return;
    setStopScan(false);
    await new Promise((r) => setTimeout(r, 100));
    const videoElement = document.getElementById("scanView");
    if (videoElement instanceof HTMLVideoElement) {
      const scanner = new QrScanner(
        videoElement,
        (result) => {
          console.log(result.data);
          setBtnScan(true);
          setStopScan(true);
        },
        {
          onDecodeError: (error) => {
            console.error(error);
          },
          maxScansPerSecond: 1,
          highlightScanRegion: true,
          highlightCodeOutline: true,
          returnDetailedScanResult: true,
        }
      );
      await scanner.start();
      while (stopScan === false) await new Promise((r) => setTimeout(r, 100));
      scanner.stop();
      scanner.destroy();
    } else {
      console.error("Element with ID 'scanView' is not a video element");
    }
  };

  const handleVerification = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    // const data = new FormData(e.target);
    // setSuccessMsg("");
    // setError("");
    // console.log("first", selectedDocs.length, imageQR?.length);
    if (selectedDocs.length && imageQR?.length) {
      const isValid = await verifyMessage({
        setError,
        // message: data.get("message"),
        message: messageHash,
        address: address,
        signature: signature,
        // address: data.get("address"),
        // signature: data.get("signature"),
      });

      if (isValid) {
        // setSuccessMsg("Signature is valid!");
        toast.success("Signature is valid!");
      } else {
        toast.error("Invalid signature!");
        // setError("Invalid signature");
      }
    } else {
      toast.error("Input file!");
    }
  };

  return (
    <form className="w-full">
      <div className="credit-card w-full mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Verify Document
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
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">
                    Pilih Signature (QRCode)
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept=".png"
                    onChange={handleInputQRCode}
                    className="file-input file-input-bordered file-input-primary file-input-sm w-full text-gray-400 text-sm"
                  />
                  {/* <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleScan(!btnScan);
                    }}
                    className="btn btn-sm btn-primary text-white"
                  >
                    Scan QRCode
                  </button> */}
                </div>
              </label>

              {btnScan === false && (
                <video
                  id="scanView"
                  style={{
                    width: "300px",
                    height: "300px",
                    borderStyle: "dotted",
                  }}
                ></video>
              )}

              <div className="my-3">
                {imageQR && (
                  <Image alt="QRCode" src={imageQR} width={200} height={200} />
                )}
                {/* <DocViewer
                  documents={selectedQRCode.map((file) => ({
                    uri: window.URL.createObjectURL(file),
                    fileName: file.name,
                  }))}
                  pluginRenderers={[PNGRenderer]}
                /> */}
              </div>
            </div>
            {/* <div className="my-3">
              <textarea
                required
                name="signature"
                className="textarea hidden w-full h-24 textarea-bordered focus:ring focus:outline-none"
                placeholder="Signature"
              />
            </div>
            <div className="my-3">
              <input
                required
                type="text"
                name="address"
                className="textarea hidden w-full input input-bordered focus:ring focus:outline-none"
                placeholder="Signer address"
              />
            </div> */}
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
            // type="submit"
            onClick={handleVerification}
            className="btn btn-primary btn-block uppercase text-white"
          >
            Verify Document
          </button>
          <div className="mt-4">
            <ErrorMessage message={error} />
            <SuccessMessage message={successMsg} />
          </div>
        </footer>
      </div>
    </form>
  );
}
