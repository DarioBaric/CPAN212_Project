const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const PORT = process.env.PORT || 8000;
const app = express();
dotenv.config();

// Enable CORS for all routes
app.use(cors());

/* Project setup: For the server
1 - new project folder
2 - open an integrated terminal
3 - run these commands:
    npm init -y
    npm i express nodemon mongoose cors
*/

// Adding our MongoDB database
mongoose.connect("mongodb+srv://dbaric36:EdgkccC6DHOMYgQm@darioscluster.fv6wz.mongodb.net/"); // Establishing a connection -> connect command + an API string to connect to our database
// This does not keep the connection, only establishes where it will go to connect
const db = mongoose.connection; // Saving the database use case into a variable

db.once("open", () => {
  // Check connection
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  // Check for DB errors
  console.log("DB Error");
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

const Product = require("./models/products");

app.get("/api/fetch-all-products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products); // Return the fetched products as JSON
  } catch (err) {
    res.status(500).send(err); // Handle error
  }
});

app.get("/api/fetch-all-products-promises", (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products); // Return the fetched products as JSON
    })
    .catch((err) => {
      res.status(500).send(err); // Handle error
    });
});

app.get("/api/fetch-filter-products", (req, res) => {
  let filters = {}; // Create an empty object to later append any new responses

  // Check for title, description, ratings, and product_section
  if (req.query.title) {
    filters.title = req.query.title;
  }
  if (req.query.description) {
    filters.description = req.query.description;
  }
  if (req.query.ratings) {
    filters.ratings = parseFloat(req.query.ratings);
  }
  if (req.query.product_section) {
    filters.product_section = req.query.product_section;
  }

  console.log("Filter: ");
  console.log(filters);

  Product.find(filters)
    .then((products) => {
      res.json(products); // Return the fetched products as JSON
    })
    .catch((err) => {
      res.status(500).send(err); // Handle error
    });
});

app.get("/api/product/:id", (req, res) => {
  const productId = req.params.id;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/api/save-product", async (req, res) => {
  const { title, description, image, ratings, product_section } = req.body;
  console.log(req.body);

  // Create a new product instance
  const newProduct = new Product({
    title,
    description,
    image,
    ratings,
    product_section
  });

  newProduct.save()
    .then((savedProduct) => {
      res.status(201).json(savedProduct);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.delete("/api/delete-product", (req, res) => {
  const productId = req.body._id;

  Product.deleteOne({ _id: productId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).send({ message: "Product not found" });
      }
      res.status(200).send({ message: "Product deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send(err); // Handle any errors
    });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get("/api/fetch-filter-products", (req, res) => {
  let filters = {};

  // Check for title, description, ratings, and product_section
  if (req.query.title) {
      filters.title = req.query.title;
  }
  if (req.query.description) {
      filters.description = req.query.description;
  }
  if (req.query.ratings) {
      filters.ratings = parseFloat(req.query.ratings);
  }
  if (req.query.product_section) {
      filters.product_section = req.query.product_section;
  }

  Product.find(filters)
      .then((products) => {
          res.json(products);
      })
      .catch((err) => {
          res.status(500).send(err);
      });
});
