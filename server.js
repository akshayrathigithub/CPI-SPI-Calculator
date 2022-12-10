const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

// our localhost port
const port = 4001;

const app = express();

// our server instance
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.start = app.listen = function () {
  return server.listen.apply(server, arguments);
};
const router = express.Router();
const publicPath = path.join(__dirname, "../Calculator");

app.use(express.static("Calculator"));
app.use(router);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/Calculator/index.html"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
