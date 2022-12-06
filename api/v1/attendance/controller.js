const db = require("../../../config/sequelize");

exports.markAttendance = async function (req, res) {
  let { user_id, org_id } = req.body;
  try {
    const attendance = await db.Attendance.create({
      user_id,
      org_id,
    });
    res.status(201).send(attendance);
  } catch (error) {
    res.status(500).send({ msg: "attendance not marked" });
  }
};
