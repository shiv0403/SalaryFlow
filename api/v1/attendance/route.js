const { markAttendance, getAttendance } = require("./controller");

module.exports = function (router) {
  router.post("/mark-attendance", markAttendance);
  router.get("/get-attendance/:org_id", getAttendance);
};
