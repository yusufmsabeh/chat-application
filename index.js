// loading the environment variables
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connection = require("./database/config");
const authRouter = require("./routes/auth");
const chatRouter = require("./routes/message");
const groupRouter = require("./routes/group");
const multer = require("multer");
const upload = multer();

const PORT = process.env.SERVER_PORT || 5000;
const HOST = process.env.HOST || "localhost";
const app = express();
app.use(upload.any());

// public endpoints
app.use("/auth", authRouter);
app.use("/chatting", chatRouter);
app.use("/group", groupRouter);
connection.authenticate().then(() => {
  connection.sync().then(() => {
    app.listen(PORT, HOST, () => console.log(" Server started on port ", PORT));
  });
});
