const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const PORT = process.env.PORT || 8000;
const app = express();
dotenv.config();

app.use(cors());

mongoose.connect("mongodb+srv://dbaric36:EdgkccC6DHOMYgQm@darioscluster.fv6wz.mongodb.net/Nozama");
const db = mongoose.connection;

db.once("open", async () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.log("DB Error:", err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

const Product = require("./models/products");

app.get("/fetch-products", async (req, res) => {
  console.log("Request received at fetch-products");
  try {
    const products = await Product.find();
    console.log("Products fetched from DB:", products);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
