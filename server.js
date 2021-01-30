const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3001;
const contactRouter = require("./contact/contact.routes");

app.use(express.json());

app.use("/contact", contactRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hi there!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
