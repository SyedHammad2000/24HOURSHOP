import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>
        <Toaster position="top-center" />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
