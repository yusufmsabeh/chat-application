const connection = require("../database/config");
const { DataTypes } = require("sequelize");

const Session = connection.define("session", {
  session_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    required: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
});

module.exports = Session;
