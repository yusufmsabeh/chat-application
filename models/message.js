const connection = require("../database/config");
const { DataTypes } = require("sequelize");

const Message = connection.define(
  "message",
  {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      required: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true,
    },
    received: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    // defining the sender_id foreign key here because we want it to not accept null as a value
    sender_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "messages",
  },
);

module.exports = Message;
