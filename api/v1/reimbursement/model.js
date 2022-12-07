const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Reimbursement = sequelize.define(
    "Reimbursement",
    {
      rmb_receipt: DataTypes.STRING,
      rmb_reason: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      org_id: DataTypes.INTEGER,
      rmb_amt: DataTypes.DOUBLE,
      isClaimed: DataTypes.INTEGER,
      remark: DataTypes.STRING,
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
      tableName: "reimbursement",
      freezeTableName: true,
    }
  );

  Reimbursement.associate = function (models) {
    Reimbursement.hasOne(models.User, {
      foreignKey: "id",
      sourceKey: "user_id",
      as: "user",
    });
  };

  return Reimbursement;
};
