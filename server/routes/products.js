const express = require("express");
const router = express.Router();
const db = require("./db");
const { collection, getDocs, doc, getDoc } = require("firebase/firestore");

// Get All Products
router.get("/", async (req, res) => {
  try {
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get Product by ID
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const productRef = doc(db, "products", productId);
    const productSnapshot = await getDoc(productRef);
    if (!productSnapshot.exists()) {
      return res.status(404).json({ message: "Product not found" });
    }
    const product = productSnapshot.data();
    res.json(product);
  } catch (error) {
    console.error("Error fetching product from Firestore:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
