/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import React, { useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import baseUrl from "@/baseUrl";
import toast from "react-hot-toast";

const login = () => {
  const router = useRouter();
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        console.log(data);
        cookie.set("token", data.token);
        cookie.set("role", data.user.role);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      console.log("something went wrong");
    }
  };

  return (
    <div className="" style={{ height: "100vh" }}>
      <h1 className="text-5xl text-center text-pretty font-bold"> Log In </h1>
      <div
        className="row flex justify-center items-center  p-2"
        style={{ height: "100vh", width: "35vw" }}
      >
        <form
          className="col s12  rounded-md shadow-2xl text-center"
          style={{ height: "20rem" }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="row">
            <div className="input-field col s12">
              <input
                id="email"
                type="email"
                className="validate"
                placeholder="Email"
                value={email}
                onChange={(e) => Setemail(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                className="validate"
                placeholder="Password"
                value={password}
                onChange={(e) => Setpassword(e.target.value)}
              />
            </div>
          </div>
          <button className="waves-effect waves-light light-blue btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default login;
