import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />

      <Toaster position="top-center" />
      {children}

      <Footer />
    </div>
  );
};

export default Layout;
