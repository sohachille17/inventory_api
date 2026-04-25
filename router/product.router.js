const express = require("express");
const router = express.Router();

/* calling controller */
const {
  addProduct,
  getOneProduct,
  getAllProducts,
  updateSingleProduct,
} = require("../controller/product.controller");

router.route("/products").post(addProduct);
router.route("/products").get(getAllProducts);
router.route("/:id").get(getOneProduct);
router.route("/:id").put(updateSingleProduct);

module.exports = router;
