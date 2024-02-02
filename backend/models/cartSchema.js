// Cart Model
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

// Create cart schema
const cartSchema = Schema({
  user: {
    type: ObjectId,
    ref: "user",
  },
  products: [
    {
      product: {
        type: ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
});

export default mongoose.models.cart || mongoose.model("cart", cartSchema);
