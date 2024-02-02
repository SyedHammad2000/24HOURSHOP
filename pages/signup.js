import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

import toast from "react-hot-toast";

// import M from "materialize-css";

const Signup = () => {
  const router = useRouter();
  const [name, SetName] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/signup",
        {
          name,
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
        router.push("/login");
      }

      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("something went wrong");
    }
  };

  return (
    <div className="" style={{ height: "100vh" }}>
      <h1 className="text-5xl text-center text-pretty font-bold">Sign Up</h1>
      <div
        className="row flex justify-center items-center  p-2"
        style={{ height: "100vh", width: "35vw" }}
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="col s12  rounded-md shadow-2xl text-center"
          style={{ height: "28rem" }}
        >
          <div className="row">
            <div className="input-field col s12 ">
              <input
                placeholder="First Name"
                id="first_name"
                type="text"
                className="validate"
                value={name}
                onChange={(e) => SetName(e.target.value)}
              />
            </div>
          </div>
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

export default Signup;
