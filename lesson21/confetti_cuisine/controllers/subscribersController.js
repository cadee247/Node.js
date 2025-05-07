const Subscriber = require("../models/subscriber");

// Render form for creating a new subscriber
exports.new = (req, res) => {
    res.render("subscribers/new"); // Explicitly reference the "subscribers" folder
};

// Fetch all subscribers
exports.index = async (req, res, next) => {
    try {
        const subscribers = await Subscriber.find({});
        res.locals.subscribers = subscribers;
        next();
    } catch (error) {
        console.error(`Error fetching subscribers: ${error.message}`);
        next(error);
    }
};

// Render view for all subscribers
exports.indexView = (req, res) => {
    res.render("subscribers/index", { subscribers: res.locals.subscribers });
};

// Create a new subscriber
exports.create = async (req, res, next) => {
    try {
        const newSubscriber = new Subscriber({
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode,
        });
        await newSubscriber.save();
        console.log("Subscriber saved successfully!");
        next(); // Pass control to the next middleware (redirectView)
    } catch (error) {
        console.error(`Error creating subscriber: ${error.message}`);
        next(error);
    }
};

// Redirect after an operation
exports.redirectView = (req, res) => {
    res.redirect("/subscribers");
};

// Render the subscription page
exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};

// Save a new subscriber
exports.saveSubscriber = async (req, res, next) => {
    try {
        const newSubscriber = new Subscriber({
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode,
        });
        await newSubscriber.save();
        console.log("Subscriber saved successfully!");
        res.redirect("/subscribers");
    } catch (error) {
        console.error(`Error saving subscriber: ${error.message}`);
        next(error);
    }
};

// Show a specific subscriber
exports.show = async (req, res, next) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (subscriber) {
            res.locals.subscriber = subscriber;
            res.render("subscribers/show");
        } else {
            res.status(404).send("Subscriber not found");
        }
    } catch (error) {
        console.error(`Error fetching subscriber: ${error.message}`);
        next(error);
    }
};

// Render view for a specific subscriber
exports.showView = (req, res) => {
    res.render("subscribers/show", { subscriber: res.locals.subscriber });
};

// Render form for editing a subscriber
exports.edit = async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        res.render("subscribers/edit", { subscriber }); // Explicitly reference the "subscribers" folder
    } catch (error) {
        console.error(`Error fetching subscriber for edit: ${error.message}`);
        res.redirect("/subscribers");
    }
};

// Update a subscriber
exports.update = async (req, res, next) => {
    try {
        const subscriber = await Subscriber.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.locals.subscriber = subscriber;
        next();
    } catch (error) {
        console.error(`Error updating subscriber: ${error.message}`);
        next(error);
    }
};

// Delete a subscriber
exports.delete = async (req, res, next) => {
    try {
        await Subscriber.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        console.error(`Error deleting subscriber: ${error.message}`);
        next(error);
    }
};