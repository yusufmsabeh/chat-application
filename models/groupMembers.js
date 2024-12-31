const connectoin = require("../database/config");
const GroupMembers = connectoin.define(
  "groupMembers",
  {},
  { tableName: "group_members" },
);
module.exports = GroupMembers;
