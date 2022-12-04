const { addDept, getDept } = require("./controller");

module.exports = function (router) {
  router.post("/add-dept", addDept);
  router.get("/get-depts/:org_id", getDept);
};
