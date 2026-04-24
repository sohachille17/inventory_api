const { Product } = require("../model/Product");
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
      const productObj = {
        imageUrl: req.file ? req.file.path : null,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        isInStock: req.body.isInStock,
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
