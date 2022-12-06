const bcrypt = require("bcrypt");
const config = require("../config/env/development.json");

exports.hashPassword = function (plainPassword) {
  const salt = bcrypt.genSaltSync(config.password.saltRounds);
  const hashedPassword = bcrypt.hashSync(plainPassword, salt);
  return hashedPassword;
};

exports.comparePasswords = function (plainPassword, hashPassword) {
  return bcrypt.compareSync(plainPassword, hashPassword);
};

exports.makePassword = function (length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
