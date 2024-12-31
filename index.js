const express = require("express");
const app = express();
const { getConnection } = require("./database/config");
app.get("/", (req, res) => {
  res.send("Hello world!");
});
getConnection()
  .authenticate()
  .then(() => {
    getConnection()
      .sync()
      .then(() => {
        app.listen(8080, "localhost", () =>
          console.log(" Server started on port 3000"),
        );
      });
  });
