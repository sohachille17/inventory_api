const { Product } = require("../model/Product");
const { Category } = require("../model/Category");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
exports.addProduct = [
  upload.single("imageUrl"),
  async (req, res) => {
    try {
      const category = await Category.findById({ _id: req.body.category });
      if (!category) {
        return res.status(404).json({
          message: `No category found`,
          data: null,
        });
      }
      const productObj = {
        imageUrl: req.file ? req.file.path : null,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        isInStock: req.body.isInStock,
        available: req.body.available,
      };

      const product = await Product.create(productObj);

      return res.status(200).json({
        message: "product post successfully",
        data: product,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  },
];

exports.getOneProduct = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "sorry id not present",
    });
  } else {
    // find
    const product = await Product.find({ _id: id });

    if (!product) {
      return res.status(200).json({
        message: "No produuct find",
      });
    } else {
      return res.status(200).json({
        data: product,
        message: "product find successfully",
      });
    }
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    // check for all products with find

    const product = await Product.find();
    if (!product) {
      return res.status(500).json({
        message: `No product found`,
      });
    }

    return res.status(200).json({
      message: "products found",
      data: product,
    });
  } catch (error) {
    res.send(error);
  }
};
exports.updateSingleProduct = [
  upload.single("imageUrl"),
  async (req, res) => {
    try {
      const id = req.params.id;

      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({
          message: `Product with id ${id} not found`,
        });
      }

      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(404).json({
          message: "No category found",
          data: null,
        });
      }

      const productObj = {
        imageUrl: req.file ? req.file.path : product.imageUrl,
        name: req.body.name,
        price: req.body.price,
        category: category._id,
        isInStock: req.body.isInStock,
        available: req.body.available,
      };

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: productObj },
        { new: true, runValidators: true },
      );

      return res.status(200).json({
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  },
];
