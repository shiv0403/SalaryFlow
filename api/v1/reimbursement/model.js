const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Reimbursement = sequelize.define(
    "Reimbursement",
    {
      rmb_receipt: DataTypes.STRING,
      rmb_reason: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      isClaimed: DataTypes.INTEGER,
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
  return Reimbursement;
};
