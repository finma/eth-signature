"use client";

import { auth } from "@/config/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState({});

  const router = useRouter();

  const createAccount = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      Cookies.set("uid", user.uid);

      return {
        error: false,
        message: "Signup with email success!",
      };
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      return {
        error: true,
        message: errorMessage,
        code: errorCode,
      };
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      return {
        error: false,
        message: "Signin with google success!",
      };
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      return {
        error: true,
        message: errorMessage,
        code: errorCode,
      };
    }
  };

  const emailSignIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      Cookies.set("uid", user.uid);

      return {
        error: false,
        message: "Signin with email success!",
      };
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      return {
        error: true,
        message: errorMessage,
        code: errorCode,
      };
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);

      Cookies.remove("uid");

      router.push("/");

      return {
        error: false,
        message: "Signout success!",
      };
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      return {
        error: true,
        message: errorMessage,
        code: errorCode,
      };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        setUser(currentUser);
      }
      // console.log("current user: ", currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ createAccount, googleSignIn, emailSignIn, logOut, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
