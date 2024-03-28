const http = require("http");
const fs = require("fs");

function rqListener(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");

    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log("chunk", chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      // fs.writeFile("message.text", message);
      // res.statusCode = 302;
      // res.setHeader("Location", "/");

      // return res.end();

      fs.writeFile("message.text", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");

        return res.end();
      });
    });
  }

  res.setHeader("Content-type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>Hello from Node.js server</h1></body>");
  res.write("</html>");

  res.end();
}

const server = http.createServer(rqListener);

server.listen(3000);
