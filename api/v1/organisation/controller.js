const db = require("../../../config/sequelize");
const messages = require("./messages.json");

exports.getOrg = async function (req, res) {
  let { org_id } = req.params;
  try {
    const org = await db.Organisation.findOne({
      where: {
        id: org_id,
      },
    });
    res.status(200).send(org);
  } catch (error) {
    res.status(500).send({ msg: messages.ORG_NOT_GET });
  }
};
