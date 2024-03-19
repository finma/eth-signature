import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJg8NUvnTWikG-MSHkrp-3MZ619rOh9Ok",
  authDomain: "eth-signature.firebaseapp.com",
  projectId: "eth-signature",
  storageBucket: "eth-signature.appspot.com",
  messagingSenderId: "838275412498",
  appId: "1:838275412498:web:08f704288a60b8f230decb",
  measurementId: "G-CR04NXTP42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
