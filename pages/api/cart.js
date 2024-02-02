// Cart Verification
// pages/api/cart.js
// Cart Verification

// import ConnectDb from "../../backend/connectdb/ConnectDB";
import jwt from "jsonwebtoken";
import cartSchema from "../../backend/models/cartSchema";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      await AddToCart(req, res);
      break;
    case "GET":
      await GetCart(req, res);
      break;
    case "DELETE":
      await DeleteCart(req, res);
      break;
  }
}

async function AddToCart(req, res) {
  const { productId, quantity } = req.body;
  //authorization
  const { authorization } = req.headers;
  console.log(productId);

  try {
    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
    }
    let userData = jwt.verify(authorization, process.env.JWT_SECRET);
    const userId = userData.id;
    console.log(userId);

    // check if user cart is created or not;
    const cartuser = await cartSchema.findOne({ user: userId });
    if (!cartuser) {
      const newCart = new cartSchema({
        user: userId,
      });
      await newCart.save();
      return res.status(200).send({});
    }
    //checking if the product already exists in the users cart then add to it otherwise push
    // checking if the product already exists in the user's cart then add to it otherwise push
    const productExists = cartuser.products.find(
      (product) => product.product.toString() === productId
    );
    if (productExists) {
      await cartSchema.findOneAndUpdate(
        {
          _id: cartuser._id,
          "products.product": productId,
        },
        {
          $inc: {
            "products.$.quantity": quantity,
          },
        }
      );

      res
        .status(200)
        .send({ success: true, message: "Quantity has been updated" });
    } else {
      const newProduct = { product: productId, quantity };
      await cartSchema.findOneAndUpdate(
        {
          _id: cartuser._id,
        },
        {
          $push: {
            products: newProduct,
          },
        }
      );
    }
    res.status(200).send({ success: true, message: "Item Added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong" });
  }
}

async function GetCart(req, res) {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
    }
    let userData = jwt.verify(authorization, process.env.JWT_SECRET);
    const userId = userData.id;
    console.log(userId);
    const cart = await cartSchema
      .findOne({ user: userId })
      .populate("products.product");
    console.log(cart);
    res.status(200).send({ cart });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "something went wrong" });
  }
}

async function DeleteCart(req, res) {
  const { productId } = req.body;
  const { authorization } = req.headers;
  // const { authorization } = req.headers;
  try {
    if (!productId) {
      return res.status(401).json({ error: "Product Id required" });
    }
    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
    }
    const userData = jwt.verify(authorization, process.env.JWT_SECRET);
    const userId = userData.id;
    console.log(userId);
    console.log(productId);

    const product = await cartSchema.findOneAndUpdate(
      {
        user: userId,
        "products.product": productId,
      },
      {
        $pull: {
          products: {
            product: productId,
          },
        },
      }
    );

    res
      .status(200)
      .send({ success: true, product, message: "Product Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success,error: "something went wrong" });
  }
}
