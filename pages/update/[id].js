/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Update = () => {
  const router = useRouter();
  const { id } = router.query;
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
  });

  //   update Product
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/product/${id}`
      );
      const { product } = data;
      console.log(product[0].name);
      setProductData(product[0]);
    };
    if (id) {
      fetchProduct();
    }
  }, []);
  // cloudinary
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/product/${id}`,
        {
          name: productData.name,
          description: productData.description,
          price: productData.price,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        router.push("/");
      }
      const { Product } = data;
      console.log(Product);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="row">
        <div className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input
                placeholder="Name"
                id="first_name"
                type="text"
                className="validate"
                value={productData.name}
                onChange={(e) =>
                  setProductData({ ...productData, name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                className="validate"
                placeholder="description"
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="number"
                type="number"
                className="validate"
                placeholder="Price"
                value={productData.price}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    price: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <button className=" btn blue" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx);
  console.log(cookie);
  if (cookie?.role != "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}

export default Update;
