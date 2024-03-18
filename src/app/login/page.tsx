"use client";

import { UserAuth } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [isPassword, setIsPassword] = useState(true);

  const { emailSignIn } = UserAuth();

  const handleLogin = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");

    // console.log("data login: ", {
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    if (email !== null && password !== null) {
      const result = await emailSignIn(email as string, password as string);

      console.log("result: ", result);
    }
  };

  return (
    <main className="bg-white rounded-lg">
      <div className="container flex flex-col mx-auto bg-white rounded-lg">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center xl:p-10">
              <form
                onSubmit={handleLogin}
                className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
              >
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  Sign In
                </h3>
                <p className="mb-4 text-grey-700">
                  Enter your email and password
                </p>

                {/* BUTTON SIGN IN WITH GOOGLE */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("sign in with google");
                  }}
                  className="btn flex items-center justify-center w-full rounded-2xl text-grey-900 bg-grey-300 "
                >
                  <div className="relative block h-6 w-6">
                    <Image
                      src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                      alt="image"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  Sign in with Google
                </button>
                <div className="divider">OR</div>

                {/* INPUT EMAIL */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Email*</span>
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter an email"
                    required
                    className="input input-bordered flex items-center w-full px-5 py-4 mb-2 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  />
                </label>

                {/* INPUT PASSWORD */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Password*</span>
                  </div>
                  <label className="input input-bordered flex items-center w-full px-5 py-4 mb-6 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl">
                    <input
                      id="password"
                      type={isPassword ? "password" : "text"}
                      name="password"
                      placeholder="Enter a password"
                      required
                      className="grow"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsPassword(!isPassword);
                      }}
                    >
                      <FontAwesomeIcon icon={isPassword ? faEyeSlash : faEye} />
                    </button>
                  </label>
                </label>

                {/* BUTTON SIGNIN */}
                <button className="btn btn-primary w-full md:w-96 rounded-2xl text-white">
                  Sign In
                </button>

                {/* NOT REGISTERED */}
                <p className="text-sm leading-relaxed text-grey-900 mt-4">
                  Not registered yet?{" "}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("create account");
                    }}
                    className="font-bold text-grey-700"
                  >
                    Create an Account
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
