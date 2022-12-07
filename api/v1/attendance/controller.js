const db = require("../../../config/sequelize");
const { Op } = require("sequelize");
const logger = require("../../../helper/logger");
const moment = require("moment");

exports.markAttendance = async function (req, res) {
  let { user_id, org_id } = req.body;
  try {
    let curr_date = moment().format("YYYY-MM-DD");
    const attendance = await db.Attendance.create({
      user_id,
      org_id,
      attendance_date: curr_date,
    });
    res.status(201).send(attendance);
  } catch (error) {
    res.status(500).send({ msg: "attendance not marked" });
  }
};

exports.getAttendanceUser = async function (req, res) {
  let { user_id } = req.params;
  try {
    const attendance = await db.Attendance.findAll({
      where: {
        user_id,
      },
    });
    res.status(200).send(attendance);
  } catch (error) {
    res.status(500).send({ msg: "could not get attendance" });
  }
};

exports.getAttendance = async function (req, res) {
  let { org_id } = req.params;

  try {
    let curr_date = moment().format("YYYY-MM-DD");
    const attendance = await db.Attendance.findAll({
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["f_name", "l_name"],
          include: [
            {
              model: db.Position,
              as: "position",
              attributes: ["pos_name"],
            },
          ],
        },
      ],
      where: {
        org_id,
        attendance_date: {
          [Op.eq]: curr_date,
        },
      },
    });
    res.status(200).send(attendance);
  } catch (error) {
    logger.warn(error.message);
    res.status(500).send({ msg: "could not get attendance" });
  }
};
