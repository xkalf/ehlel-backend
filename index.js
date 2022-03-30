const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AuthRoute = require("./routes/auth");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/auth", AuthRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
