const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const SalaryTrans = sequelize.define(
    "SalaryTrans",
    {
      user_ids: DataTypes.STRING,
      org_id: DataTypes.INTEGER,
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
      tableName: "salary_trans",
      freezeTableName: true,
    }
  );
  return SalaryTrans;
};
