const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');

const path = require("path");
const PORT = process.env.PORT || 8000;
const app = express();
dotenv.config();

app.use(cors());

mongoose.connect("mongodb+srv://dbaric36:EdgkccC6DHOMYgQm@darioscluster.fv6wz.mongodb.net/Nozama");
const db = mongoose.connection;

db.once("open", async () => {
  console.log("Connected to MongoDB");
  
    /* Test Orders
    const newOrder = new Order({
      user: '675a1c9a9ca9c190fa43160e',
      shipping_address: {
        street: '123 Fake Street',
        city: 'Faketown',
        province: 'FA',
        postal_code: '12345',
        country: 'USA'
      },
      billing_address: {
        street: '123 Fake Street',
        city: 'Faketown',
        province: 'FA',
        postal_code: '12345',
        country: 'USA'
      },
      order_items: [
        {
          product: '67589a245db1d1abf64da757',
          quantity: 1,
          price: 79.99
        },
        {
          product: '67589a245db1d1abf64da758',
          quantity: 2,
          price: 14.99
        }
      ],
      payment_details: {
        method: 'Credit Card',
        transaction_id: 'txn_78910'
      },
      shipping_cost: 15,
      total_cost: 109.97
    });
  
    try {
      // Insert new order
      await newOrder.save();
      console.log('Test order saved successfully');
  
      // Fetch all orders
      const orders = await Order.find();
      console.log('Fetched orders after insert:', orders); // This should show the orders in the server console
    } catch (err) {
      console.error('Error saving order:', err);
    }
      */
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

// Create a new product
app.post("/products", async (req, res) => {
  try {
    const { title, description, image, ratings, product_section, price } = req.body;
    const product = new Product({ title, description, image, ratings, product_section, price });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a product
app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const Users = require("./models/users");

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await Users.findOne({ email });
    if (!users) throw new Error('Users not found');
    const isMatch = await users.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials');
    const token = jwt.sign({ userId: users._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the JWT as a cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents client-side JavaScript from reading the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 1000 * 60 * 60 // 1 hour
    });
    
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const auth = (req, res, next) => {
  const token = req.cookies.token; // Read token from the cookie
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Registration Route
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const users = new Users({ username, email, password });
    await users.save();
    const token = jwt.sign({ userId: users._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Example protected route
app.get("/profile", auth, async (req, res) => {
  try {
    const users = await Users.findById(req.userId).select('-password'); // Exclude password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const Order = require("./models/orders");
const users = require("./models/users");

// Order Routes
app.post("/orders", async (req, res) => {
  try {
    const { shipping_address, billing_address, order_items, payment_details, shipping_cost, total_cost } = req.body;
    const orders = new Order({
      user: req.userId,
      shipping_address,
      billing_address,
      order_items,
      payment_details,
      shipping_cost,
      total_cost
    });
    await orders.save();
    res.status(201).json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/fetch-orders", async (req, res) => {
  try {//{ user: req.userId }).populate('order_items.products'
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/orders/:id", async (req, res) => {
  try {
    const { shipping_address, billing_address, order_items, payment_details, shipping_cost, total_cost, order_status } = req.body;
    const orders = await Order.findByIdAndUpdate(req.params.id, {
      shipping_address,
      billing_address,
      order_items,
      payment_details,
      shipping_cost,
      total_cost,
      order_status
    }, { new: true });
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/orders/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.static(path.join(__dirname, 'client/build')));

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 1000 * 60 * 60 * 24,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
