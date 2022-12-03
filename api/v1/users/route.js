const { signup, login, logout, updateUser } = require("./controller");

module.exports = function (router) {
  router.post("/signup-user", signup);
  router.post("/login-user", login);
  router.get("/logout-user", logout);
  router.put("/update-user", updateUser);
};
