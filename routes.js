const fs = require("fs");

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<header><title>Enter Message</title></header>");
        res.write("<body><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></form></body>");
        res.write("</html>");
        res.end();
    };
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on("end", () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split("=")[1];
            fs.writeFile("message.text", message, (err) => {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                res.end();
            });
        });
    }
};

// module.exports = requestHandler;

// module.exports = {handler: requestHandler};

// module.exports.handler = requestHandler;

exports.handler = requestHandler;
