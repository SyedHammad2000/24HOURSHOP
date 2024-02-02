import React, { useState } from "react";
import { parseCookies } from "nookies";
import axios from "axios";

import toast from "react-hot-toast";

const Create = () => {
  const [name, setName] = useState();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, image, description, price);
    const media = await ImageUpload();
    try {
      const data = await axios.post("http://localhost:3000/api/product", {
        name,
        image: media.data.url,
        description,
        price,
      });
      if (!data) toast.error("Error creating product");

      toast.success("Product created successfully");

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // cloudinary
  const ImageUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ecommerce");
    data.append("cloud_name", "dn3tasa5d");

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dn3tasa5d/image/upload`,
      data
    );
    console.log(res);
    return res;
  };

  return (
    <div>
      <div className="row">
        <form className="col s12" onSubmit={(e) => handleSubmit(e)}>
          <div className="row">
            <div className="input-field col s6">
              <input
                placeholder="Name"
                id="first_name"
                type="text"
                className="validate"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="file"
                className="validate"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              Upload Image
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                className="validate"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <button className=" btn blue">Submit</button>
        </form>
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

export default Create;
