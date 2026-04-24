const { Product } = require("../model/Product");

exports.addProduct = async (req, res) => {
  try {
    const productObj = req.body;

    const product = await Product.create(productObj);
    if (!product) {
      res.status(400).json({
        message: `No product post`,
      });
    } else {
      res.status(200).json({
        message: "product post successfully",
        data: product,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

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
