/* eslint-disable import/no-anonymous-default-export */
// login api

import ConnectDb from "@/backend/connectdb/ConnectDB";
import UserSchema from "@/backend/models/UserSchema";
import jwt from "jsonwebtoken";
// import Usersc from "@/backend/models/UserSchema";

export default async (req, res) => {
  await ConnectDb();
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).send({ error: "Email and Password are required" });

    const user = await UserSchema.findOne({ email });
    if (!user)
      return res.status(400).send({ error: "Email or Password is incorrect" });

    const isMatch = (user.password = password);
    if (!isMatch) {
      return res.status(400).send({ error: "Email or Password is incorrect" });
    }
    // generate token

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .send({
        success: true,
        user,
        token,
        message: "You are successfully Logged in",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong" });
  }
};
