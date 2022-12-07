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

  Attendance.associate = function (models) {
    Attendance.hasOne(models.User, {
      foreignKey: "id",
      sourceKey: "user_id",
      as: "user",
    });
  };

  return Attendance;
};
