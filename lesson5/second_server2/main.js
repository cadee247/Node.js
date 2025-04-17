"use strict";

const routeResponseMap = {
  "/info": "<h1>Info Page</h1>",
  "/contact": "<h1>Contact Us</h1>",
  "/about": "<h1>Learn More About Us</h1>", // Matches your requirement
  "/hello": "Say hello by emailing us <a href='mailto:rousseaucadee@gmail.com'>here</a>.", // Updated with anchor tag for email
  "/error": "Sorry, the page you are looking for is not here." // Plain text for error message
};

const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  app = http.createServer((req, res) => {
    // Check if the requested route exists in the map
    if (routeResponseMap[req.url]) {
      // Adjusting the status code based on the route
      if (req.url === "/error") {
        res.writeHead(httpStatus.NOT_FOUND, { "Content-Type": "text/plain" }); // 404 with plain text
      } else {
        res.writeHead(httpStatus.OK, { "Content-Type": "text/html" }); // 200 with HTML
      }
      res.end(routeResponseMap[req.url]);
    } else {
      // Default response for undefined routes
      res.writeHead(httpStatus.OK, { "Content-Type": "text/html" });
      res.end("<h1>Welcome!</h1>");
    }
  });

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);