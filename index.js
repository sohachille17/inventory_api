const express = require("express");

const app = express();

require("dotenv").config();
const morgan = require("morgan");

const productRoute = require("./router/product.router");
const categoryRoute = require("./router/category.router");

const { connectionDB } = require("./database/db");
connectionDB();

app.get("/", (req, res) => {
  res.send(Date.now().toString());
});
// calling middlewares here

app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/v1/", productRoute);
app.use("/api/v1/", categoryRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`),
);
