/* eslint-disable @next/next/no-img-element */
import React from "react";
import axios from "axios";
import baseUrl from "@/baseUrl";
import { parseCookies } from "nookies";
import StripeCheckout from "react-stripe-checkout";
import  toast  from "react-hot-toast";

const Cart = ({ cartData }) => {
  const { token } = parseCookies();

  const { cart } = cartData;

  const { products } = cart;

  let price = 0;

  const handleDelete = async (productId) => {
    console.log(productId);
    console.log(token);
    try {
      const { data } = await axios.delete(`${baseUrl}/api/cart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        data: {
          productId,
        },
      });
      console.log(data);
      if(data.success){
        toast.success(data.message)
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async (PaymentInfo) => {
    console.log(PaymentInfo);
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/charges`,
        {
          amount: price,
          PaymentInfo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        window.location.reload();
      }
    } catch (error) {}
  };

  return (
    <div className="cart">
      <h1 className="text-center text-2xl">Cart</h1>
      <div className="row ">
        <div
          className="col s8 drop-shadow-xl "
          style={{
            height: "25rem",
            overflow: "auto",
            scrollbarWidth: "thin",
            scrollBehavior: "smooth",
          }}
        >
          {products.map((cartData) => {
            {
              price += cartData.product.price * cartData.quantity;
            }

            return (
              <div
                className="flex justify-between card "
                style={{ height: "100px" }}
                key={cartData._id}
              >
                <div className="flex card-body justify-center items-center ml-2">
                  <img
                    src={cartData.product.image}
                    style={{ height: "80px" }}
                    alt="product"
                    className="rounded-full"
                  />
                  <div className="flex flex-col ml-2">
                    <p>{cartData.product.name}</p>
                    <p>{cartData.product.price}$</p>
                    <p>Qty:{cartData.quantity}</p>
                  </div>
                </div>
                <div className=" flex justify-center items-center mr-2">
                  <button
                    className="btn red"
                    onClick={() => handleDelete(cartData.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <span className="col s4 card h-52 rounded-lg flex justify-center items-center flex-col">
          <h1 className="text-center mt-2 text-2xl font-semibold">
            Total:{price}
          </h1>
          <a>
            <StripeCheckout
              token={(PaymentInfo) => handleCheckout(PaymentInfo)}
              stripeKey="pk_test_51OQpi9Kh7tyffymbIlB9fg5IC1RQO32nM5nMeRNuVx3Tj18EF8Pz9UEwqQjlSqyP2yWtWjK36M2izP8lHa58zmUf00up1bB70H"
              amount={price * 100}
              name="NextJS Ecom"
              currency="USD"
            />
          </a>
        </span>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const cookie = parseCookies(ctx);
  console.log(cookie.token);

  const { data } = await axios.get(`${baseUrl}/api/cart`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookie?.token}`,
    },
  });
  console.log(data);
  return { props: { cartData: data } };
};

export default Cart;
