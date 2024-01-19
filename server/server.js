const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock database for example purposes
const users = [];
const products = [
  { id: 1, name: "T-Shirt", price: 20.99, imageUrl: "link-to-image-1" },
  { id: 2, name: "Jeans", price: 49.99, imageUrl: "link-to-image-2" },
  // ... more products
];
const carts = {};
// Helper function to find user by email
const findUserByEmail = (email) => users.find((user) => user.email === email);
// Signup Endpoint
app.post("/api/signup", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // In a real app, you'd also validate input and encrypt passwords

  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser = { firstName, lastName, email, password }; // Store password as hash in real app
  users.push(newUser);
  res.status(201).json({ message: "User created successfully", user: newUser });
});

// Login Endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // In a real app, you'd verify the password hash

  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    res.json({ message: "User logged in successfully", user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Get Products Endpoint
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Add to Cart Endpoint
app.post("/api/cart/add", (req, res) => {
  const { userId, productId } = req.body;

  const user = findUserByEmail(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const product = products.find((product) => product.id === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (!carts[userId]) {
    carts[userId] = [];
  }

  carts[userId].push(product);
  res.json({ message: "Product added to cart", cart: carts[userId] });
});

// Get Cart Endpoint
app.get("/api/cart/:userId", (req, res) => {
  const { userId } = req.params;
  const userCart = carts[userId] || [];
  res.json(userCart);
});

// Remove from Cart Endpoint
app.post("/api/cart/remove", (req, res) => {
  const { userId, productId } = req.body;

  const userCart = carts[userId];
  if (!userCart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  carts[userId] = userCart.filter((product) => product.id !== productId);
  res.json({ message: "Product removed from cart", cart: carts[userId] });
});

// Checkout Endpoint
app.post("/api/cart/checkout", (req, res) => {
  const { userId } = req.body;
  const userCart = carts[userId];
  if (!userCart || userCart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  // Here you would typically process the payment and clear the cart
  carts[userId] = []; // Clear the cart after checkout
  res.json({ message: "Checkout successful" });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
