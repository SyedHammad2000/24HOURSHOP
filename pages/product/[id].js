import React, { useState } from "react";
import axios from "axios";
import baseUrl from "@/baseUrl";
import { parseCookies } from "nookies";
import Link from "next/link";
import toast from "react-hot-toast";

const DetailPage = ({ productid }) => {
  const [quantity, SetQuantity] = useState("1");
  console.log();
  const product = productid.product[0];
  console.log(product._id);
  const cookie = parseCookies();
  console.log(cookie?.token);

  const handleDelete = async () => {
    const { data } = await axios.delete(
      `${baseUrl}/api/product/${product._id}
      `,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(data);
  };
  console.log(product);

  const AddtoCart = async () => {
    const { data } = await axios.put(
      `${baseUrl}/api/cart`,
      {
        quantity,
        productId: product._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${cookie?.token}`,
        },
      }
    );
    if (data.success) {
      toast.success(data.message);
    }
    console.log(data);
  };
  return (
    <div className="container">
      <div className="row" style={{ display: "flex", width: "50%" }}>
        <div
          className="col s12 m12 "
          style={{ width: "30rem", margin: "auto" }}
        >
          <div
            className="card"
            style={{
              height: "auto",
              padding: "5px",
              /* height: 34rem; */
              width: "22rem",
            }}
          >
            <div className="card-image">
              <img
                src={product.image}
                alt="image"
                style={{ height: "15rem" }}
              />
              <span className="card-title" style={{ color: "darkslateblue" }}>
                {product.name}
              </span>
              <button
                className="btn-floating halfway-fab waves-effect waves-light red"
                onClick={() => AddtoCart()}
              >
                <i className="material-icons font-bold text-2xl">+</i>
              </button>
            </div>
            <div className="card-content grey shadow-lg">
              <p>
                <b>{product.description}</b>
              </p>
              <p>
                <b>{product.price}</b>
              </p>
            </div>
            {cookie?.role == "admin" && (
              <div className="card-action">
                <button className="btn blue" onClick={() => handleDelete()}>
                  Delete
                </button>
                <span>
                  <Link
                    href={`${baseUrl}/update/${product._id}`}
                    className="btn ml-14"
                  >
                    Update
                  </Link>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const { data } = await axios(`${baseUrl}/api/product/${id}`);
  console.log(data);
  return {
    props: { productid: data },
  };
}

export default DetailPage;
