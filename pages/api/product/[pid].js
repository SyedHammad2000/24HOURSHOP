// search by id

import ProductSchema from "@/backend/models/ProductSchema";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getProductByid(req, res);
      break;
    case "DELETE":
      await DelProductByid(req, res);
      break;
    case "PUT":
      await UpdateProductById(req, res);
      break;
  }
}

const getProductByid = async (req, res) => {
  const { pid } = req.query;
  const product = await ProductSchema.find({ _id: pid });
  res.status(200).json({ product });
};

const DelProductByid = async (req, res) => {
  const { pid } = req.query;
  await ProductSchema.findByIdAndDelete({ _id: pid });
  res.status(200).json({});
};

const UpdateProductById = async (req, res) => {
  try {
    const { pid } = req.query;

    const Product = await ProductSchema.findByIdAndUpdate(
      { _id: pid },
      req.body,
      {
        new: true,
      }
    );
    if (!Product) {
      res.status(400).send("Item not exist");
    }
    await Product.save();

    console.log(Product);
    res
      .status(200)
      .send({ success: true, Product, message: " Product updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
