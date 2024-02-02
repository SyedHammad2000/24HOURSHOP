//stripe api
import cartSchema from "@/backend/models/cartSchema";
import jwt from "jsonwebtoken";
import stripe from "stripe";

const StripeKey = new stripe(
  " sk_test_51OQpi9Kh7tyffymbSoi3c5OwoPZ0KHOfCu1hUD7UEON4IpW1jMKEIx8FFsgozrB8cgrCnteJM9sJRkWowTvbGlMU00wz8s2DLx"
);

export default async function createpayment(req, res) {
  const { amount, PaymentInfo } = req.body;
  const { authorization } = req.headers;
  console.log(amount, authorization);
  try {
    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
    }
    const userData = jwt.verify(authorization, process.env.JWT_SECRET);
    const userId = userData.id;
    console.log(userData);

    const customer = await StripeKey.customers.create({
      email: PaymentInfo.email,
      source: PaymentInfo.id,
    });
    let charge = await StripeKey.charges.create({
      amount: amount * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: PaymentInfo.email,
      description: "Payment for items in cart",
    });
    res.send({
      message: "success",
      success: true,
      charge: charge,
    });
    console.log(customer.id);
    //empty cart
    await cartSchema.findOneAndUpdate(
      {
        user: userId,
      },
      { $set: { products: [] } }
    );
  } catch (error) {
    console.log(error);
    res.send({
      message: "failure",
      success: false,
    });
  }
}
