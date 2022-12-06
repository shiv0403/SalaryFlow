const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Attendance = sequelize.define(
    "Attendance",
    {
      user_id: DataTypes.INTEGER,
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
      tableName: "attendance",
      freezeTableName: true,
    }
  );

  return Attendance;
};
