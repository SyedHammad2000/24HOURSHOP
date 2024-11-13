import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />

      <Toaster position="top-center" />
      {children}

      <Footer />
    </div>
  );
};

export default Layout;
