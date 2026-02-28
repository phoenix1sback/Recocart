const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: "Wireless Headphones", category: "durable", price: 2999 },
  { id: 2, name: "Phone Case", category: "complementary", price: 499 },
  { id: 3, name: "Toothpaste", category: "repeat", price: 120 },
];

app.post("/recommend", (req, res) => {
  const { stage, ignored, lastViewedCategory } = req.body;

  let recommendations = products.filter(
    (product) => !ignored.includes(product.id)
  );

  if (lastViewedCategory === "durable") {
    recommendations = recommendations.filter(
      (p) => p.category !== "durable"
    );
  }

  if (lastViewedCategory === "complementary") {
    recommendations = recommendations.filter(
      (p) => p.category === "complementary"
    );
  }

  if (stage === "checkout") {
    recommendations = [];
  }

  res.json({ recommendations });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});