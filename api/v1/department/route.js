const { addDept, getDept, getDeptId } = require("./controller");

module.exports = function (router) {
  router.post("/add-dept", addDept);
  router.get("/get-depts/:org_id", getDept);
  router.get("/get-deptId/:org_id/:deptName", getDeptId);
};
