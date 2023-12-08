const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://jhayeephi:jerome1985@cluster0.cofezco.mongodb.net/BookList";
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const bookRouter = require("./routes/routes.js");
app.use("/book", bookRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
