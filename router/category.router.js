const express = require("express");
const router = express.Router();

const {
  addCategory,
  getAllCategory,
  getCategoryById,
} = require("../controller/category.controller");

router.route("/").post(addCategory);
router.route("/").get(getAllCategory);

router.route("/:id").get(getCategoryById);
module.exports = router;
