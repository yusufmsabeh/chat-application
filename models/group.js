const connection = require("../database/config");
const { DataTypes } = require("sequelize");

const Group = connection.define(
  "group",
  {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      required: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    members: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "groups",
  },
);

module.exports = Group;
