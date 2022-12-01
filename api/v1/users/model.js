const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {});
  return User;
};
