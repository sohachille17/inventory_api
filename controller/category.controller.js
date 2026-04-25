const { Category } = require("../model/Category");

exports.addCategory = async (req, res) => {
  try {
    const categoryObj = req.body;

    const category = await Category.create(categoryObj);

    if (!category) {
      return res.status(400).json({
        message: `No category created`,
        status: 400,
      });
    }
    return res.status(200).json({
      status: 200,
      data: category,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();

    if (!category) {
      return res.status(404).json({
        message: "No category found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Data found successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);

    if (!category)
      return res.status(404).json({
        message: "category not found",
        data: null,
      });

    return res.status(200).json({
      message: "category found",
      data: category,
    });
  } catch (error) {
    return res.send(error);
  }
};
