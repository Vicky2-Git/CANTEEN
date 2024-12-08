import cors from "cors";
import express, { json } from "express";
import { connect } from "mongoose";
import FormDataModel from "./models/FormData.js";
// import Product from "./models/Product.js";
import bcrypt from "bcrypt";
import Product from "./models/Product.js";

const app = express();
app.use(json());
app.use(cors({ origin: "http://localhost:5173" }));

connect("mongodb://localhost:27017/canteen-food", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const exuser = await FormDataModel.findOne({ email });
    if (exuser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new FormDataModel({ email, password: hashPassword });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await FormDataModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return res.status(200).json({ message: "Login successful" });
    }
    return res.status(400).json({ message: "Invalid password" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/admin", async (req, res) => {
  const { name, price, stock, type, expiryHours, image } = req.body;
  console.log(name);
  // Basic validation
  if (!name || !price || !stock || !type) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided." });
  }

  if (!["Non-Perishable", "Perishable"].includes(type)) {
    return res.status(400).json({
      error: "Invalid product type. Must be 'Non-Perishable' or 'Perishable'.",
    });
  }

  try {
    // Check if the product already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists." });
    }

    // Create a new product
    const newProduct = new Product({
      name,
      price,
      stock,
      type,
      expiryHours,
      image,
      createdAt: Date.now(), // Ensure createdAt is set to the current time
    });
    await newProduct.save();
    // Respond with the newly created product
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(3001, () => {
  console.log("Server listening on http://127.0.0.1:3001");
});
