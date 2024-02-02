import mongoose from "mongoose";

const ConnectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log(process.env.MONGO_URI);
};
export default ConnectDb;
