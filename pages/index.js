/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import axios from "axios";
import baseUrl from "@/baseUrl";
// import Image from "next/image";
import Link from "next/link";
// import "@/styles/globals.css"

const index = ({ product }) => {
  const products = product.product;
  console.log(products);
  // pagination

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      <div className="row m-auto mt-2">
        <div className="col s12  flex justify-center flex-wrap items-center ">
          {currentProducts.map((item) => {
            return (
              <div
                className="card small hoverable  "
                style={{
                  width: "12rem",
                  height: "22rem",
                  textAlign: "center",
                  margin: "auto",
                  marginBottom: "2rem",
                }}
                key={item._id}
              >
                <div className="card-image">
                  <img
                    src={item.image}
                    alt="image"
                    style={{ height: "10rem" }}
                  />
                </div>
                <div className="card-content font-bold">
                  <h1>{item.name}</h1>
                </div>
                <div className="card-action  text-center">
                  <Link href={`${baseUrl}/product/${item._id}`}>
                    Detail Page
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="row text-center">
        {/* create simple pagination buttons */}
        <div className="col s12">
          <ul className="pagination">
            {currentPage > 1 && (
              <li onClick={() => setCurrentPage(currentPage - 1)}>
                <button className="waves-effect btn">
                  <i className="material-icons">Prev</i>
                </button>
              </li>
            )}
            {currentPage === 1 && (
              <li
                className={currentPage === totalPages ? "disabled" : ""}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <button className="waves-effect btn">
                  <i className="material-icons">Next</i>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${baseUrl}/api/product`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(data);

  return {
    props: {
      product: data,
    },
  };
};

export default index;
