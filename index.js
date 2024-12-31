const express = require("express");
const app = express();
const connection = require("./database/config");
app.get("/", (req, res) => {
  res.send("Hello world!");
});

connection.authenticate().then(() => {
  connection.sync({ alter: true }).then(() => {
    app.listen(3000, "localhost", () =>
      console.log(" Server started on port 3000"),
    );
  });
});
