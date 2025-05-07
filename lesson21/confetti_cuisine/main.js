"use strict";

const express = require("express");
const app = express();
const router = express.Router(); // <-- Define router here
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const subscribersController = require("./controllers/subscribersController");
const methodOverride = require("method-override");

// Connect to MongoDB
mongoose.connect("mongodb://0.0.0.0:27017/confetti_cuisine", { useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method")); // Enable method-override for PUT and DELETE requests

// Use router for subscribers-related routes
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id", subscribersController.update, subscribersController.redirectView); // Updated route
router.delete("/subscribers/:id", subscribersController.delete, subscribersController.redirectView); // Updated route

// Attach router to the app
app.use(router);

// Main Routes
app.get("/", homeController.index);
app.get("/courses", homeController.showCourses);
app.post("/contact", homeController.postedSignUpForm);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

// Error Handling
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

// Start Server
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});