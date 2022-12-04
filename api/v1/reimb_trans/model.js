const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const ReimbTrans = sequelize.define(
    "ReimbTrans",
    {
      user_id: DataTypes.INTEGER,
      org_id: DataTypes.INTEGER,
      rmb_id: DataTypes.INTEGER,
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
      tableName: "rmb_trans",
      freezeTableName: true,
    }
  );
  return ReimbTrans;
};
