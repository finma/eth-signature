"use client";

import { UserAuth } from "@/context/AuthContext";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const NavBar = () => {
  const { logOut, user } = UserAuth();
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    // console.log("user: ", user);
    setCurrentUser(user);
  }, [user]);

  const handleLogout = async () => {
    const result = await logOut();

    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      setCurrentUser({});
    }
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          {Object.keys(currentUser).length !== 0 ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full text-3xl">
                  <FontAwesomeIcon icon={faUserCircle} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button>History</button>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm text-white ">
              SignIn
            </Link>
          )}
        </div>
      </div>
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
};

export default NavBar;
