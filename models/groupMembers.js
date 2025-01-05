const connection = require("../database/config");
const GroupMembers = connection.define(
  "groupMembers",
  {},
  { tableName: "group_members" },
);
module.exports = GroupMembers;
