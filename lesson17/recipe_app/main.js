"use strict";

const express = require("express");
const mongoose = require("mongoose");
const Subscriber = require("../recipe_app/models/subscriber"); // Ensure correct path

const app = express();

// Connect to MongoDB using async/await for better error handling
async function connectDB() {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Successfully connected to MongoDB using Mongoose.");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit if connection fails
    }
}

connectDB();

// Middleware Configuration
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Sample Subscribers Data
const subscribers = [
    { name: "Beta", email: "beta@email.com", zipCode: 12345 },
    { name: "Blaine", email: "blaine@email.com", zipCode: 12345 },
    { name: "Cadee", email: "cadee@email.com", zipCode: 12345 },
    { name: "Melissa", email: "mellissa@email.com", zipCode: 12345 },
];

// Insert Subscribers into the Database (avoiding duplicates)
async function insertSubscribers() {
    try {
        const existingEmails = await Subscriber.find({}, "email"); // Get existing emails
        const existingEmailSet = new Set(existingEmails.map(sub => sub.email)); // Convert to Set

        // Filter out duplicates before inserting
        const newSubscribers = subscribers.filter(sub => !existingEmailSet.has(sub.email));

        if (newSubscribers.length > 0) {
            const result = await Subscriber.insertMany(newSubscribers, { ordered: false });
            console.log("Subscribers added successfully:", result.map(sub => sub.getInfo()));
        } else {
            console.log("No new subscribers to add (duplicates skipped).");
        }
    } catch (err) {
        console.error("Error adding subscribers:", err.message);
    } finally {
        mongoose.connection.close();
        console.log("MongoDB connection closed.");
    }
}

insertSubscribers();

// Create and Find Local Subscribers
async function findLocalSubscribers() {
    try {
        const john = new Subscriber({ name: "John", email: "john@email.com", zipCode: 12345 });
        await john.save(); // Save John first

        const localSubscribers = await john.findLocalSubscribers();
        console.log("Local subscribers found:", localSubscribers);
    } catch (err) {
        console.error("Error finding local subscribers:", err);
    }
}

findLocalSubscribers();

// Start Express Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

















// Quick check 17.1 When you use promises with Mongoose queries, what should a query
// always return

// When using promises with Mongoose, you should expect to get a promise as a
//  result of a database query. Getting back a promise ensures that a result or error can be handled appro
// priately without having to worry about timing issues with asynchronous queries. 


// Why do you need to require the database connection and Mongoose mod
// els into REPL to test your code?

// Until you build views to interact with your database, REPL is a great tool to run
//  CRUD operations on your models. But you need to require the modules with which you’d like to test so
//  that your REPL environment will know which database to save to and which Subscriber model you’re
//  creating. 


// How do you distinguish between a model that’s associated to one
//  instance of another model versus many instances?

//  When defining a model’s schema, you can specify that model’s relationship as
//  one-to-many by wrapping the associated model in brackets. The brackets indicate an array of associated
//  records. Without the brackets, the association is one-to-one.


// Why wouldn’t you want to populate every associated model on every
//  query?

// Populating every associated model on every query can lead to performance issues,