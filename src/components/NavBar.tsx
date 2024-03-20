"use client";

import { UserAuth } from "@/context/AuthContext";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function NavBar() {
  const { logOut } = UserAuth();
  const [cookie, setCookie] = useState<string | undefined>();

  useEffect(() => {
    const cookie = Cookies.get("uid");
    setCookie(cookie);
  }, []);

  const handleLogout = async () => {
    const result = await logOut();

    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
    }
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            Versidig
          </Link>
        </div>
        <div className="flex-none">
          {cookie ? (
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
                  <Link href="/history">History</Link>
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
    </>
  );
}
