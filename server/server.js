const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} = require("firebase/firestore");

const saltRounds = 10;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfAXybvA6UudURsN05uUdKJODKJ-bmsEk",
  authDomain: "crownshop-d0a80.firebaseapp.com",
  projectId: "crownshop-d0a80",
  storageBucket: "crownshop-d0a80.appspot.com",
  messagingSenderId: "48748251738",
  appId: "1:48748251738:web:a7d308f3eacd1eadc8e663",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Express app setup
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Signup Endpoint
app.post("/api/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = { firstName, lastName, email, password: hashedPassword };
    await addDoc(usersRef, newUser);

    res.status(201).json({
      message: "User created successfully",
      user: { firstName, lastName, email },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Fetch user from Firestore
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Assuming only one user with this email
    const user = querySnapshot.docs[0].data();

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // Omit the password when sending the user data
      const { password, ...userWithoutPassword } = user;
      res.json({
        message: "User logged in successfully",
        user: userWithoutPassword,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get Products Endpoint
app.get("/api/products", async (req, res) => {
  try {
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);

    // Convert Firestore documents to a list of products
    const products = querySnapshot.docs.map((doc) => doc.data());

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add to Cart Endpoint
app.post("/api/cart/add", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Validate request
    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing userId or productId" });
    }

    // Fetch user from Firestore
    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch product from Firestore
    const productRef = doc(db, "products", productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add product to user's cart
    const user = userSnapshot.data();
    const product = productSnapshot.data();
    const cart = user.cart ? [...user.cart, product] : [product];

    // Update user's cart in Firestore
    await updateDoc(userRef, { cart });

    res.json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get Cart Endpoint
app.get("/api/cart/:userId", (req, res) => {
  const { userId } = req.params;
  const userCart = carts[userId] || [];
  res.json(userCart);
});
// Remove from Cart Endpoint
app.post("/api/cart/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Fetch user from Firestore
    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      return res.status(404).json({ message: "User not found" });
    }

    let user = userSnapshot.data();
    let cart = user.cart || [];

    // Remove the product from the cart
    cart = cart.filter((item) => item.id !== productId);

    // Update the user's cart in Firestore
    await updateDoc(userRef, { cart });

    res.json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//checkout endpoint
app.post("/api/cart/checkout", async (req, res) => {
  try {
    const { userId } = req.body;

    // Fetch user from Firestore
    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      return res.status(404).json({ message: "User not found" });
    }

    let user = userSnapshot.data();

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Process payment (Placeholder - implement your payment logic here)

    // Clear the cart after checkout
    await updateDoc(userRef, { cart: [] });

    res.json({ message: "Checkout successful" });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//get product by id
app.get("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Fetch product from Firestore
    const productRef = doc(db, "products", productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      return res.status(404).send("Product not found");
    }

    const product = productSnapshot.data();
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Internal server error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
