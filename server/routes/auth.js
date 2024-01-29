const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} = require("firebase/firestore");
const db = getFirestore(); // Initialize Firestore
const secretKey = "secretKey"; // Secret key for JWT

// Signup Endpoint
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, id } = req.body;
  try {
    if (!email || !password || !firstName || !lastName || !id) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      id,
    };
    await addDoc(usersRef, newUser);
    res.status(201).json({
      message: "User created successfully",
      user: { firstName, lastName, email, id },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data();
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ userId: userDoc.id }, secretKey, {
        expiresIn: "1h",
      });
      const { password, ...userWithoutPassword } = user;
      return res.json({
        message: "User logged in successfully",
        user: userWithoutPassword,
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
