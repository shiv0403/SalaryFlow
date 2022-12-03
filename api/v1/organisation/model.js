const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Organisation = sequelize.define(
    "Organisation",
    {
      org_name: DataTypes.STRING,
      org_logo: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      emps: DataTypes.INTEGER,
      auto_pay: DataTypes.INTEGER,
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
      tableName: "organisation",
      freezeTableName: true,
    }
  );
  return Organisation;
};
