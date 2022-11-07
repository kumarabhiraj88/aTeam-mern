import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 30,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
  },
  vitamin: {
    type: Number,
  },
});

const product = mongoose.model("product", productSchema);
export default product;
