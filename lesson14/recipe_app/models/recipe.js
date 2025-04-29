const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for a recipe item
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: [
    {
      name: String,
      quantity: String
    }
  ],
  steps: [String], // Array of strings for the cooking instructions
  courseType: {
    type: String, // e.g., "Appetizer", "Main Course", "Dessert"
    enum: ["Appetizer", "Main Course", "Dessert", "Side Dish", "Snack", "Beverage"],
    required: true
  },
  cookingTime: {
    type: Number, // In minutes
    required: true
  },
  servings: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model for the schema
const Recipe = mongoose.model("Recipe", recipeSchema);

// Export the model
module.exports = Recipe;