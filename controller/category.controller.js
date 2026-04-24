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
