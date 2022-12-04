const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Bank = sequelize.define(
    "Bank",
    {
      bank_name: DataTypes.STRING,
      bank_logo: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        set() {
          this.setDataValue(moment());
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        set() {
          this.setDataValue(moment());
        },
      },
    },
    {
      tableName: "bank",
      freezeTableName: true,
    }
  );
  return Bank;
};
