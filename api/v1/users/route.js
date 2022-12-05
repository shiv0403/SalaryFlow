const {
  signup,
  login,
  logout,
  updateUser,
  getOrgEmps,
} = require("./controller");

module.exports = function (router) {
  router.post("/signup-user", signup);
  router.post("/login-user", login);
  router.get("/logout-user", logout);
  router.put("/update-user", updateUser);
  router.get("/get-orgEmps/:org_id", getOrgEmps);
};
