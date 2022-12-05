const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "User",
    {
      f_name: DataTypes.STRING,
      l_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.INTEGER,
      dept_id: DataTypes.INTEGER,
      pos_id: DataTypes.INTEGER,
      incr: DataTypes.DOUBLE,
      org_id: DataTypes.INTEGER,
      profile_img: DataTypes.STRING,
      doj: DataTypes.DATE,
      leave_cnt: DataTypes.INTEGER,
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
      tableName: "user",
      freezeTableName: true,
    }
  );

  User.associate = function (models) {
    User.hasOne(models.Position, {
      foreignKey: "id",
      sourceKey: "pos_id",
      as: "position",
    });

    User.hasOne(models.Department, {
      foreignKey: "id",
      sourceKey: "dept_id",
      as: "department",
    });
  };

  return User;
};
