const express = require("express");
const router = express.Router();

const { addCategory } = require("../controller/category.controller");

router.route("/category").post(addCategory);

module.exports = router;
