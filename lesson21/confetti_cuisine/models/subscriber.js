
const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    zipCode: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Subscriber", subscriberSchema);