const { addUserBank, getUserBank } = require("./controller");

module.exports = function (router) {
  router.post("/add-userBank", addUserBank);
  router.get("/get-userBank/:user_id", getUserBank);
};
