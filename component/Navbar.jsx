import React from "react";
import Link from "next/link";
import cookie from "js-cookie";
import { parseCookies } from "nookies";
// import { useRouter } from "next/router";

const Navbar = () => {
  const isLoggedIn = cookie.get("token");

  const isAdmin = cookie.get("role");

  const handler = () => {
    cookie.remove("token");
    cookie.remove("role");

    window.location.reload();
  };

  return (
    <div className="navbar">
      <Link href="/">
        <h1>24HrShop</h1>
      </Link>
      <ul>
        {isAdmin === "admin" ? (
          <li>
            <Link href="/create">Create</Link>
          </li>
        ) : null}

        {isLoggedIn ? (
          <li>
            <Link href={""} className="btn blue" onClick={() => handler()}>
              Logout
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/signup">SignUp</Link>
            </li>
          </>
        )}
        <li>
          <Link href="/cart">Cart</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
