const { addBank, getBanks } = require("./controller");

module.exports = function (router) {
  router.post("/add-bank", addBank);
  router.get("/get-banks", getBanks);
};
