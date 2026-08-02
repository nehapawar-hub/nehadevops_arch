const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("User Service is Running");
});

app.listen(3000, () => {
  console.log("User Service running on port 3000");
});