const {
  addLeave,
  getLeave,
  getLeaves,
  updateLeaveStatus,
} = require("./controller");

module.exports = function (router) {
  router.post("/add-leave", addLeave);
  router.get("/get-leave/:leave_id", getLeave);
  router.get("/get-leaves/:user_id", getLeaves);
  router.put("/update-leaveStatus", updateLeaveStatus);
};
