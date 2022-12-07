const {
  addReimb,
  getUserReimb,
  getReimb,
  updateReimb,
  getRmbOrg,
  photoUpload,
} = require("./controller");

module.exports = function (router) {
  router.post("/add-reimb", addReimb);
  router.get("/photo-upload", photoUpload);
  router.get("/get-userReimb/:user_id", getUserReimb);
  router.get("/get-reimbOrg/:org_id", getRmbOrg);
  router.get("/get-reimb/:reimb_id", getReimb);
  router.put("/update-reimb", updateReimb);
};
