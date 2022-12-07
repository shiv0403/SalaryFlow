const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Attendance = sequelize.define(
    "Attendance",
    {
      user_id: DataTypes.INTEGER,
      org_id: DataTypes.INTEGER,
      attendance_date: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        set() {
          this.setDataValue(moment().utcOffset("+05:30"));
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        set() {
          this.setDataValue(moment().utcOffset("+05:30"));
        },
      },
    },
    {
      tableName: "attendance",
      freezeTableName: true,
    }
  );

  return Attendance;
};
