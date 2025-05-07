"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose,
    Subscriber = require("./subscribers");

const userSchema = new Schema(
    {
        name: {
            first: { type: String, trim: true },
            last: { type: String, trim: true }
        },
        email: { type: String, required: true, unique: true },
        zipCode: { type: Number, min: [10000, "Zip code too short"], max: 99999 },
        password: { type: String, required: true },
        courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
        subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" }
    },
    { timestamps: true }
);

userSchema.virtual("fullName").get(function () {
    return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", async function (next) {
    let user = this;

    try {
        if (!user.subscribedAccount) {
            const subscriber = await Subscriber.findOne({ email: user.email });
            user.subscribedAccount = subscriber;
        }
        next();
    } catch (error) {
        console.error(`Error in connecting subscriber: ${error.message}`);
        next(error);
    }
});

// **New Methods for Updating and Deleting Users**
userSchema.statics.updateUser = async function (userId, updateData) {
    try {
        const updatedUser = await this.findOneAndUpdate(
            { _id: userId },
            updateData,
            { new: true, runValidators: true }
        );
        return updatedUser;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};

userSchema.statics.deleteUser = async function (userId) {
    try {
        await this.findByIdAndDelete(userId);
        return { message: "User deleted successfully" };
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};

module.exports = mongoose.model("User", userSchema);