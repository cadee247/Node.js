const port = 3000;
const http = require("http");
const httpStatusCodes = require("http-status-codes");
const router = require("./router");
const fs = require("fs");

const plainTextContentType = { "Content-Type": "text/plain" };
const htmlContentType = { "Content-Type": "text/html" };

const customReadFile = (file, res) => {
    fs.readFile(`./views/${file}`, (errors, data) => {
        if (errors) {
            console.error("Error reading the file:", errors);
            res.writeHead(httpStatusCodes.INTERNAL_SERVER_ERROR, htmlContentType);
            res.end("<h1>500 - Internal Server Error</h1>");
            return;
        }
        res.end(data);
    });
};

// Register routes
router.get("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("INDEX");
});

router.get("/index.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("index.html", res);
});

router.get("/contact.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("contact.html", res);
});

router.post("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("POSTED");
});

http.createServer(router.handle).listen(port);
console.log(`The server is listening on port number: ${port}`);