const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3003;

// Localhost for local testing.
// Kubernetes will override these using environment variables.
const USER_SERVICE =
  process.env.USER_SERVICE || "http://localhost:3000";

const PRODUCT_SERVICE =
  process.env.PRODUCT_SERVICE || "http://localhost:3001";

const ORDER_SERVICE =
  process.env.ORDER_SERVICE || "http://localhost:3002";

app.get("/", (req, res) => {
  res.send("Gateway Service is Running");
});

app.get("/api/users", async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE}/users`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get(`${PRODUCT_SERVICE}/products`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const response = await axios.get(`${ORDER_SERVICE}/orders`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Gateway Service running on port ${PORT}`);
});