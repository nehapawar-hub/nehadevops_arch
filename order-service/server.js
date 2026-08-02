const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3002;

// Localhost for local testing.
// Later in Kubernetes, change these using environment variables.
const USER_SERVICE =
  process.env.USER_SERVICE || "http://localhost:3000";

const PRODUCT_SERVICE =
  process.env.PRODUCT_SERVICE || "http://localhost:3001";

app.get("/", (req, res) => {
  res.send("Order Service is Running");
});

app.get("/orders", async (req, res) => {
  try {
    const userResponse = await axios.get(`${USER_SERVICE}/users`);
    const productResponse = await axios.get(`${PRODUCT_SERVICE}/products`);

    res.json({
      message: "Order created successfully",
      user: userResponse.data,
      products: productResponse.data
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to communicate with other services",
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});