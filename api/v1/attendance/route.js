const { markAttendance } = require("./controller");

module.exports = function (router) {
  router.post("/mark-attendance", markAttendance);
};
