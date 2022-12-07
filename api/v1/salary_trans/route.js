const {
  addSalaryTrans,
  getSalaryTrans,
  getSalaryTransUser,
} = require("./controller");

module.exports = function (router) {
  router.post("/add-salaryTrans", addSalaryTrans);
  router.get("/get-salaryTrans/:org_id", getSalaryTrans);
  router.get("/get-salaryTransUser/:user_id", getSalaryTransUser);
};
