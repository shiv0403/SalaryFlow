const {
  markAttendance,
  getAttendance,
  getAttendanceUser,
} = require("./controller");

module.exports = function (router) {
  router.post("/mark-attendance", markAttendance);
  router.get("/get-attendance/:org_id", getAttendance);
  router.get("/get-attendanceUser/:user_id", getAttendanceUser);
};
