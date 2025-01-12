const { Sequelize } = require("sequelize");

let connection;
getConnection = () => {
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
connection = getConnection();
module.exports = connection;
// Import models
const User = require("../models/user");
const Group = require("../models/group");
const groupMembers = require("../models/groupMembers");
const Message = require("../models/message");
const Session = require("../models/session");

User.belongsToMany(Group, { through: groupMembers });
User.hasMany(Message, {
  foreignKey: "sender_id",
  // allowNull: false,
});
User.hasMany(Message, {
  foreignKey: "receiver_id",
  // allowNull: true,
});
Group.hasMany(Message, {
  foreignKey: "group_id",
  // allowNull: true,
});
