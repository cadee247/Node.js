// database.js
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

// Connect to MongoDB
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Function to create a new subscriber instance
const createSubscriber = async (name, email, zipCode) => {
    const newSubscriber = new Subscriber({ name, email, zipCode });
    try {
        await newSubscriber.save();
        console.log(`Subscriber ${name} added successfully!`);
    } catch (error) {
        console.error("Error saving subscriber:", error);
    }
};

// Export functions
module.exports = { db, createSubscriber };