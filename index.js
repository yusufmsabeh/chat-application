// loading the environment variables
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connection = require("./database/config");
const authRouter = require("./routes/auth");
const multer = require("multer");
const upload = multer();

const PORT = process.env.SERVER_PORT || 5000;

const app = express();
app.use(upload.any());

// public endpoints
app.use("/auth", authRouter);

connection.authenticate().then(() => {
  connection.sync().then(() => {
    app.listen(PORT, "localhost", () =>
      console.log(" Server started on port ", PORT),
    );
  });
});
