"use strict";

const express = require("express");
const app = express();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const Recipe = require("./models/recipe"); // Import the Recipe model

// Connecting to the database
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", { useNewUrlParser: true });

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// Creating Documents to Save to DB (Subscriber Example)
Subscriber.create({
  name: "Jada Mathele",
  email: "jada@mathele.com"
})
  .then((savedDoc) => {
    console.log(savedDoc);
  })
  .catch((err) => {
    console.log(err);
  });

const query = Subscriber.find({ name: "Jada Mathele" }).exec();
query
  .then(docs => {
    console.log(docs); // Handle the results
  })
  .catch(err => {
    console.error(err); // Handle errors
  });

// Creating and Saving a Recipe Document to DB
Recipe.create({
  title: "Spaghetti Carbonara",
  ingredients: [
    { name: "Spaghetti", quantity: "200g" },
    { name: "Eggs", quantity: "2" },
    { name: "Parmesan cheese", quantity: "50g" },
    { name: "Pancetta", quantity: "100g" },
    { name: "Black pepper", quantity: "To taste" }
  ],
  steps: [
    "Cook the spaghetti according to package instructions.",
    "Fry the pancetta until crispy.",
    "Mix eggs and parmesan cheese in a bowl.",
    "Combine spaghetti, pancetta, and egg mixture.",
    "Serve and top with black pepper."
  ],
  courseType: "Main Course",
  cookingTime: 30,
  servings: 2
})
  .then((recipeDoc) => {
    console.log(recipeDoc); // Log the created recipe
  })
  .catch((err) => {
    console.error(err); // Handle errors
  });

// Application settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

// Routes
app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

// Error handling
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});