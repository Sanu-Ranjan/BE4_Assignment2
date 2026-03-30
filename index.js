require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDb } = require("./db/db.connection");
const { Recipe } = require("./models/recipe.models");

const app = express();

app.use(cors());
app.use(express.json());

const homePath = "/neog/BE/4/Assignemnt_2";

const dataObj = {
  data: (data) => ({ data: data, error: null }),
  error: (error) => ({ data: null, error: error }),
};

const success = (message, data) => ({
  success: true,
  message,
  data,
});

const fail = (message, details = null) => ({
  success: false,
  error: message,
  details,
});

const addRecipe = async (recipe) => {
  try {
    const saveddata = await Recipe.create(recipe);
    return dataObj.data(saveddata);
  } catch (error) {
    return dataObj.error(error);
  }
};

const getAllRecipe = async () => {
  try {
    const data = await Recipe.find();
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

const getRecipesBy = async (querryParam) => {
  try {
    const data = await Recipe.find(querryParam);
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

const getOneRecipeBy = async (querryParam) => {
  try {
    const data = await Recipe.findOne(querryParam);
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

const updateRecipeById = async (id, updateData) => {
  try {
    const data = Recipe.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

const updateRecipeBy = async (querryParam, updateData) => {
  try {
    const data = Recipe.findOneAndUpdate(querryParam, updateData, {
      returnDocument: "after",
    });
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

const deleteRecipeById = async (id) => {
  try {
    const data = Recipe.findByIdAndDelete(id, { returnDocument: "after" });
    return dataObj.data(data);
  } catch (error) {
    return dataObj.error(error);
  }
};

app.get(`${homePath}`, (req, res) => {
  res.send("Welcome to Express server");
});

app.get(`${homePath}/recipe`, async (req, res) => {
  const { data, error } = await getAllRecipe();

  if (error) {
    console.log("db error: fetching all recipe", error);
    return res
      .status(500)
      .json(fail("Internal server error: db operation failed"));
  }

  res.status(200).json(success("recipies fetched", { data: data }));
});

app.post(`${homePath}/recipe`, async (req, res) => {
  const recipe = req.body;
  const { data, error } = await addRecipe(recipe);

  if (error) {
    console.log("db error: adding new recipe", error);
    return res
      .status(500)
      .json(fail("Internal server error: db operation failed"));
  }

  res.status(201).json(success("Recipe added", { data: data }));
});

(async () => {
  await connectDb();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
  });
})();
