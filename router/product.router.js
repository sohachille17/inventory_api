const express = require("express");
const router = express.Router();

/* calling controller */
const {
  addProduct,
  getOneProduct,
} = require("../controller/product.controller");

router.route("/product").post(addProduct);
router.route("/:id").get(getOneProduct);
module.exports = router;
