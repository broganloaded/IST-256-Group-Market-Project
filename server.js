/* 
Node API (Express) - Mapped to MongoDB via Mongoose
Authors: Isaiah, Logan, Alex, Daniel
*/
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./db");
const Shopper = require("./models/Shopper");
const Product = require("./models/Product");
const ShoppingCart = require("./models/ShoppingCart");
const ShippingBilling = require("./models/ShippingBilling");
const ReturnItem = require("./models/ReturnItem");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("../public")); // serve frontend if you run from server folder (adjust path)

async function start() {
  await connect();

  // Shopper
  app.post("/api/shopper", async (req, res) => {
    try {
      const doc = await Shopper.create(req.body);
      res.json(doc);
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  // Product
  app.post("/api/products", async (req, res) => {
    try {
      const doc = await Product.create(req.body);
      res.json(doc);
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  // Cart
  app.post("/api/cart", async (req, res) => {
    try {
      const doc = await ShoppingCart.create(req.body);
      res.json(doc);
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  // Shipping/Billing
  app.post("/api/shippingBilling", async (req, res) => {
    try {
      const doc = await ShippingBilling.create(req.body);
      res.json(doc);
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  // Returns
  app.post("/api/returns", async (req, res) => {
    try {
      const doc = await ReturnItem.create(req.body);
      res.json(doc);
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

start().catch(err => console.error(err));
