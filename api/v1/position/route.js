const { addPosition, getPosition, getPositions } = require("./controller");

module.exports = function (router) {
  router.post("/add-position", addPosition);
  router.get("/get-position/:pos_id", getPosition);
  router.get("/get-positions/:org_id", getPositions);
};
