const { addSalaryTrans, getSalaryTrans } = require("./controller");

module.exports = function (router) {
  router.post("/add-salaryTrans", addSalaryTrans);
  router.get("/get-salaryTrans/:org_id", getSalaryTrans);
};
