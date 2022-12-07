const { addUserBank, getUserBank, updateUserBank } = require("./controller");

module.exports = function (router) {
  router.post("/add-userBank", addUserBank);
  router.get("/get-userBank/:user_id", getUserBank);
  router.put("/update-userBank", updateUserBank);
};
