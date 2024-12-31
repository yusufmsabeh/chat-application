const connection = require("../database/config");
const { DataTypes } = require("sequelize");

const User = connection.define(
  "User",
  {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      required: true,
    },
    username: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue:
        "https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png",
    },
  },
  {
    tableName: "users",
  },
);
module.exports = User;
