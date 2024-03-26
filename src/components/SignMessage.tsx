"use client";

import { db, storage } from "@/config/firebase";
import { UserAuth } from "@/context/AuthContext";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Button from "./Button";
import { ethers } from "ethers";
import { saveAs } from "file-saver";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { keccak256 } from "js-sha3";
import Image from "next/image";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 } from "uuid";

type Signature =
  | {
      message: string;
      signature: string;
      address: string;
    }
  | undefined;

type DataFirestore = {
  uid: string;
  filename: string;
  message: string;
  address: string;
  signature: string;
  imageUrl: string;
};

// SIGN MESSAGE
const signMessage = async ({ message }: any) => {
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
    toast.error(err.message);
  }
};

// ADD DATA TO FIRESTORE
const addDataToFirestore = async ({
  uid,
  filename,
  message,
  address,
  signature,
  imageUrl,
}: DataFirestore) => {
  try {
    await addDoc(collection(db, "history"), {
      uid,
      filename,
      message,
      address,
      signature,
      imageUrl,
      createdAt: serverTimestamp(),
    });

    return {
      error: false,
      message: "Success add data to firestore!",
    };
  } catch (error) {
    // console.log("error: ", error);

    return {
      error: true,
      message: "Failed add data to firestore!",
    };
  }
};

export default function SignMessage() {
  const { user } = UserAuth();

  const [signature, setSignature] = useState<Signature>();
  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);
  const [messageHash, setMessageHash] = useState<string>();
  const [src, setSrc] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    // console.log("user: ", user);
    setCurrentUser(user);
  }, [user]);

  // HANDLE INPUT FILE
  const handleInput = (e: React.ChangeEvent<any>) => {
    setSignature(undefined);
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

  // HANDLE SIGN MESSAGE/FILE
  const handleSign = async () => {
    if (selectedDocs.length) {
      const sig: Signature = await signMessage({
        message: messageHash,
      });
      if (sig) {
        console.log("result: ", sig);
        setAddress(sig.address);
        generateQRCode(JSON.stringify(sig));
        setSignature(sig);
      }
    } else {
      toast.error("Input file");
    }
  };

  // GENERATE SIGNATURE TO QRCODE
  const generateQRCode = (data: any) => QRCode.toDataURL(data).then(setSrc);

  // HANDLE DOWNLOAD IMAGE
  const downloadImage = (filename: string) => {
    console.log("src: ", src);
    saveAs(src!, `SIGNATURE-${filename.replace(".pdf", ".png")}`);
  };

  // HANDLE SAVE DATA TO HISTORY
  const handleSaveToHistory = async (filename: string) => {
    try {
      if (Object.keys(currentUser).length !== 0) {
        const imageRef = ref(
          storage,
          `images/signatures/${
            currentUser.uid
          }/SIGNATURE-${filename}-${v4()}.png`
        );

        await uploadString(imageRef, src!, "data_url");

        const imageUrl = await getDownloadURL(imageRef);

        // console.log("download: ", imageUrl);

        const result = await addDataToFirestore({
          uid: currentUser.uid,
          filename,
          message: messageHash!,
          address: address!,
          signature: signature?.signature!,
          imageUrl,
        });

        if (!result.error) {
          toast.success("Success save to history!");
        } else {
          toast.error(result.message);
        }
      } else {
        toast.error("Please login to save to history!");
      }
    } catch (error) {
      toast.error("Error!");
    }
  };

  return (
    <main className="w-full">
      <div className="credit-card w-full mx-auto rounded-xl bg-white">
        <div className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Sign Document
          </h1>
          <div className="">
            <div className="my-3">
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
        </div>

        {/* PDF VIEWER */}
        <DocViewer
          documents={selectedDocs.map((file) => ({
            uri: window.URL.createObjectURL(file),
            fileName: file.name,
          }))}
          pluginRenderers={DocViewerRenderers}
        />
        <footer className="p-4">
          <Button type="primary" onClick={handleSign} className="uppercase">
            Sign Document
          </Button>
        </footer>

        {/* SIGNATURE */}
        {signature && (
          <div className="p-2" key={signature?.signature}>
            <p className="font-semibold">File: {selectedDocs[0].name}</p>
            <p className="font-semibold">Signer: {signature?.address}</p>
            <div className="text-center w-[200px]">
              <Image src={src!} width={200} height={200} alt="QRCode" />
              <button
                onClick={(e) => {
                  downloadImage(selectedDocs[0].name);
                }}
                className="btn"
              >
                Download
              </button>
              <button
                onClick={(e) => {
                  handleSaveToHistory(selectedDocs[0].name);
                }}
                className="btn"
              >
                Upload
              </button>
            </div>
            <div className="my-3">
              <p>
                Catatan: Simpan Signature/QRCode diatas untuk memverifikasi
                dokumen
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
