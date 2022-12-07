const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const UserBank = sequelize.define(
    "UserBank",
    {
      bank_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      acc_no: DataTypes.STRING,
      bank_ifsc: DataTypes.STRING,
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
      tableName: "user_bacc",
      freezeTableName: true,
    }
  );

  UserBank.associate = function (models) {
    UserBank.hasOne(models.Bank, {
      foreignKey: "id",
      sourceKey: "bank_id",
      as: "bank",
    });
  };

  return UserBank;
};
