/* eslint-disable import/no-anonymous-default-export */
import ConnectDb from "@/backend/connectdb/ConnectDB";
import UserSchema from "@/backend/models/UserSchema";
import cartSchema from "@/backend/models/cartSchema";

export default async (req, res) => {
  await ConnectDb();
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      return res.status(400).json({ message: "please enter all fields" });
    const user = await UserSchema.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }
    const newUser = new UserSchema({
      name,
      email,
      password,
    });
    await newUser.save();

    await new cartSchema({
      user: newUser._id,
    }).save();
    res
      .status(200)
      .json({
        message: "Your account created successfully",
        newUser,
        success: true,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
