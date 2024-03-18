"use client";

import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";
import { createContext, useContext } from "react";

const AuthContext = createContext<any>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  return (
    <AuthContext.Provider value={{ emailSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
