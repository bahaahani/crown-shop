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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
