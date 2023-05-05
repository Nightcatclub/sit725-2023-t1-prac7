var express = require("express");
var app = express();
require("./dbConnection");
let router = require("./route/route");
// const { Socket } = require("dgram");
let http = require("http").createServer(app);
let io = require("socket.o")(http);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

io.on("connection", (socket) => {
  console.log(" a client is connectioned");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

setInterval(() => {
  socket.emit("number", parseInt(Math.random() * 10));
});

var port = process.env.port || 3000;

app.listen(port, () => {
  console.log("App listening to: " + port);
});
