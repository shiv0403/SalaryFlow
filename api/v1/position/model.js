const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Position = sequelize.define(
    "Position",
    {
      pos_name: DataTypes.STRING,
      org_id: DataTypes.INTEGER,
      pos_base_pay: DataTypes.DOUBLE,
      pos_ctc: DataTypes.DOUBLE,
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
      tableName: "position",
      freezeTableName: true,
    }
  );
  return Position;
};
