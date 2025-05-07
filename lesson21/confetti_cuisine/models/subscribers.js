const mongoose = require("mongoose");

// Define Subscriber Schema with Validation
const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    zipCode: {
        type: Number,
        required: [true, "Zip Code is required"],
        min: [10000, "Zip code too short"],
        max: [99999, "Zip code too long"]
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Subscriber", subscriberSchema);