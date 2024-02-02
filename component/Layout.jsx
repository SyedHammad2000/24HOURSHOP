import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ height: "100vh" }}>
        <Toaster position="top-center" />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
