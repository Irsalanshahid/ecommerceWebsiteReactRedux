const express = require("express");
const errorMiddlerWare = require("./middleware/error")
const cookieParser = require("cookie-parser");

const app  = express();

app.use(express.json());
app.use(cookieParser());

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute")

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

app.use(errorMiddlerWare);

module.exports = app;