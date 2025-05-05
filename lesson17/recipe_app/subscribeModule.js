// subscriberModule.js
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", { useNewUrlParser: true });
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

// Function to create and save a new subscriber
const createSubscriber = async (name, email, zipCode) => {
    const newSubscriber = new Subscriber({ name, email, zipCode });
    try {
        await newSubscriber.save();
        console.log("Subscriber saved successfully!", newSubscriber);
    } catch (error) {
        console.error("Error saving subscriber:", error);
    }
};

// Export functions
module.exports = {
    connectDB,
    createSubscriber
};