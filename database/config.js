const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
let connection;
exports.getConnection = () => {
  if (!connection) {
    connection = new Sequelize({
      dialect: "mysql",
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      define: {
        timestamps: false,
        freezeTableName: true,
      },
    });
  }
  return connection;
};
