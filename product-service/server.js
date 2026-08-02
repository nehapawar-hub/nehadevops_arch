const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

const products = [
  { id: 1, name: "Laptop", price: 60000 },
  { id: 2, name: "Mobile", price: 25000 },
  { id: 3, name: "Headphones", price: 3000 }
];

app.get("/", (req, res) => {
  res.send("Product Service is Running");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});