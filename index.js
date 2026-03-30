require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDb } = require("./db/db.connection");
const { Recipe } = require("./models/recipe.models");

const app = express();

app.use(cors());
app.use(express.json());

const homePath = "/neog/BE/4/Assignemnt_2";

app.get(`${homePath}`, (req, res) => {
  res.send("Welcome to Express server");
});

(async () => {
  await connectDb();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
  });
})();
