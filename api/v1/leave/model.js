const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Leave = sequelize.define(
    "Leave",
    {
      user_id: DataTypes.INTEGER,
      org_id: DataTypes.INTEGER,
      reason: DataTypes.STRING,
      isApproved: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
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
      tableName: "emp_leave",
      freezeTableName: true,
    }
  );
  return Leave;
};
