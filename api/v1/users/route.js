const {
  signup,
  login,
  logout,
  updateUser,
  getOrgEmps,
  addEmp,
  sendEmail,
  addOrgEmps,
} = require("./controller");

module.exports = function (router) {
  router.post("/signup-user", signup);
  router.post("/login-user", login);
  router.post("/add-emp", addEmp);
  router.post("/add-orgEmps", addOrgEmps);
  router.get("/logout-user", logout);
  router.put("/update-user", updateUser);
  router.get("/get-orgEmps/:org_id", getOrgEmps);
};
