const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Department = sequelize.define(
    "Department",
    {
      org_id: DataTypes.INTEGER,
      dept_name: DataTypes.STRING,
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
      tableName: "department",
      freezeTableName: true,
    }
  );
  return Department;
};
