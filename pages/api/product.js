import ConnectDb from "@/backend/connectdb/ConnectDB";
import ProductSchema from "@/backend/models/ProductSchema";

export default async function handler(req, res) {
  await ConnectDb();

  switch (req.method) {
    case "POST":
      await CreateProduct(req, res);
      break;

    case "GET":
      await GetAllProduct(req, res);
      break;
  }
}

const CreateProduct = async (req, res) => {
  const { name, price, description, image } = req.body;
  try {
    if (!name || !price || !description) {
      return res.status(400).json({ message: "please enter all fields" });
    }
    const newProduct = new ProductSchema({
      name,
      price,
      description,
      image,
    });
    await newProduct.save();
    res
      .status(200)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const GetAllProduct = async (req, res) => {
  const product = await ProductSchema.find();
  res.status(200).json({ product });
};

// delete product
// pages/api/product.js

// delete product
