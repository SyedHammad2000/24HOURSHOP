import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.models.product ||
  mongoose.model("product", ProductSchema);
