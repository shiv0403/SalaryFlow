const { addRmbTrans, getRmbTrans } = require("./controller");

module.exports = function (router) {
  router.post("/add-rmbTrans", addRmbTrans);
  router.get("/get-rmbTrans/:user_id", getRmbTrans);
};
