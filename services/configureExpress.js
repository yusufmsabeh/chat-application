const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const upload = multer();
module.exports = (app) => {
  app.use(upload.any());
};
