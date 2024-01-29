const express = require("express");
const router = express.Router();
const {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} = require("firebase/firestore");
const db = getFirestore(); // Initialize Firestore

// Add to Cart Endpoint
router.post("/add", async (req, res) => {
  console.log("Request body:", req.body); // Log the entire request body

  const { userId, productId } = req.body;

  // Validate input
  if (!userId || !productId) {
    return res.status(400).json({ message: "UserId or ProductId is missing" });
  }

  try {
    const productRef = doc(db, "products", productId);
    const productSnapshot = await getDoc(productRef);
    if (!productSnapshot.exists()) {
      return res.status(404).json({ message: "Product not found" });
    }
    const product = { id: productSnapshot.id, ...productSnapshot.data() };

    const cartRef = doc(db, "carts", userId);
    const cartSnapshot = await getDoc(cartRef);
    let cart = cartSnapshot.exists() ? cartSnapshot.data().items : [];

    cart.push(product);
    await setDoc(cartRef, { items: cart }, { merge: true });

    res.json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error in /api/cart/add:", error);
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
});

// Get Cart Endpoint
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const cartRef = doc(db, "carts", userId);
    const cartSnapshot = await getDoc(cartRef);
    if (!cartSnapshot.exists()) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cartSnapshot.data().items);
  } catch (error) {
    console.error("Error in /api/cart/:userId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Remove from Cart Endpoint
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cartRef = doc(db, "carts", userId);
    const cartSnapshot = await getDoc(cartRef);
    if (!cartSnapshot.exists()) {
      return res.status(404).json({ message: "Cart not found" });
    }
    let cart = cartSnapshot.data().items;
    cart = cart.filter((item) => item.id !== productId);
    await updateDoc(cartRef, { items: cart });
    res.json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Error in /api/cart/remove:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Checkout Endpoint
router.post("/checkout", async (req, res) => {
  const { userId } = req.body;
  try {
    const cartRef = doc(db, "carts", userId);
    const cartSnapshot = await getDoc(cartRef);
    if (!cartSnapshot.exists() || !cartSnapshot.data().items.length) {
      return res.status(400).json({ message: "Cart is empty or not found" });
    }
    // Process payment logic goes here
    await updateDoc(cartRef, { items: [] });
    res.json({ message: "Checkout successful" });
  } catch (error) {
    console.error("Error in /api/cart/checkout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
