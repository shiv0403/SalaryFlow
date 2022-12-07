const { getOrg } = require("./controller");

module.exports = function (router) {
  router.get("/get-org/:org_id", getOrg);
};
