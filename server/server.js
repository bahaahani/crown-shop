const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const authRouter = require("./routes/auth");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
