const fs = require("fs");
const httpStatus = require("http-status-codes");

const htmlContentType = { "Content-Type": "text/html" };
const plainTextContentType = { "Content-Type": "text/plain" };

// Function to read and serve files
const customReadFile = (file, res) => {
    fs.readFile(`./views/${file}`, (errors, data) => {
        if (errors) {
            console.error("Error reading the file:", errors);
            res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, htmlContentType);
            res.end("<h1>500 - Internal Server Error</h1>");
            return;
        }
        res.end(data);
    });
};

const routes = {
    "GET": {
        "/": (req, res) => {
            res.writeHead(httpStatus.OK, plainTextContentType);
            res.end("Welcome to the Home Page");
        },
        "/info": (req, res) => {
            res.writeHead(httpStatus.OK, plainTextContentType);
            res.end("Welcome to the Info Page!");
        },
        "/contact.html": (req, res) => {
            res.writeHead(httpStatus.OK, htmlContentType);
            customReadFile("contact.html", res);
        },
        "/index.html": (req, res) => {
            res.writeHead(httpStatus.OK, htmlContentType);
            customReadFile("index.html", res);
        }
    },
    "POST": {}
};

exports.handle = (req, res) => {
    try {
        if (routes[req.method][req.url]) {
            routes[req.method][req.url](req, res);
        } else {
            res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
            res.end("<h1>404 - Page Not Found</h1>");
        }
    } catch (ex) {
        console.error("Server error:", ex);
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, htmlContentType);
        res.end("<h1>500 - Internal Server Error</h1>");
    }
};

exports.get = (url, action) => {
    routes["GET"][url] = action;
};

exports.post = (url, action) => {
    routes["POST"][url] = action;
};