const express = require("express");
const configureExpress = require("./services/configureExpress");
const connection = require("./database/config");
const routes = require("./routes/index");

const app = express();
// configure the webserver
configureExpress(app);
// assigning routes
routes(app);

const PORT = process.env.SERVER_PORT || 5000;
const HOST = process.env.HOST;
// checking and syncing database connection and start the server
connection.authenticate().then(() => {
  connection.sync().then(() => {
    app.listen(PORT, HOST, () => console.log(" Server started on port ", PORT));
  });
});
