// Handles dynamic GET request for /items/:vegetable
exports.sendReqParam = (req, res) => {
    let veg = req.params.vegetable;
    res.send(`This is the page for ${veg}`);
};

// Handles POST request to the root URL "/"
exports.sendPost = (req, res) => {
    console.log(req.body); // Logs data from the request body
    console.log(req.query); // Logs query parameters
    res.send("POST Successful!");
};

// Handles GET request for /name/:myName
exports.respondWithName = (req, res) => {
    const firstName = "Cadee"; // Static value for the first name
    const lastName = "Rousseau"; // Static value for the last name
    res.render("index", { firstName, lastName }); // Passes both values to the template
};