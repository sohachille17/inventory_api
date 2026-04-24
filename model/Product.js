const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // name of your Category model
      required: true,
    },
    isInStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamp: true,
  },
);

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
};
