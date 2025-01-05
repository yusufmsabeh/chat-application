const express = require("express");
const app = express();
const connection = require("./database/config");

const PORT = process.env.SERVER_PORT || 5000;
app.get("/", (req, res) => {
  res.send("Hello world!");
});

connection.authenticate().then(() => {
  connection.sync({ alter: true }).then(() => {
    app.listen(PORT, "localhost", () =>
      console.log(" Server started on port ", PORT),
    );
  });
});
