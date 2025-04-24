const express = require("express");
const app = express();
const homeController = require("./controllers/homeController"); // Controller functions
const layouts = require("express-ejs-layouts"); // Middleware for EJS layouts

// Set the port number (default to 3000 if no environment variable is provided)
app.set("port", process.env.PORT || 3000);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Use express-ejs-layouts middleware
app.use(layouts);

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Middleware to parse JSON data
app.use(express.json());

// Middleware to log request URLs
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next();
});

// Route: Dynamic GET request for /items/:vegetable
app.get("/items/:vegetable", homeController.sendReqParam);

// Route: POST request to the root URL "/"
app.post("/", homeController.sendPost);

// Route: Dynamic GET request for /name/:myName
app.get("/name/:myName", homeController.respondWithName);

// Route: GET request for Contact Page
app.get("/contact", (req, res) => {
  res.render("contact");
});

// Route: POST request for Contact Page form submission
app.post("/contact", (req, res) => {
  console.log("Form submitted:");
  console.log("Name:", req.body.name);
  console.log("Email:", req.body.email);
  console.log("Message:", req.body.message);
  res.send("Thank you for contacting us!");
});

// Catch-all route for undefined URLs
app.use((req, res) => {
  res.status(404).send("Page not found!");
});

// Start the server
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});