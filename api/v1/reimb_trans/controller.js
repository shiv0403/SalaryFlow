const db = require("../../../config/sequelize");
const logger = require("../../../helper/logger");

exports.addRmbTrans = async function (req, res) {
  let { org_id, user_id, rmb_id } = req.body;
  try {
    const rmbTrans = await db.ReimbTrans.create({
      org_id,
      user_id,
      rmb_id,
    });
    res.status(201).send(rmbTrans);
  } catch (error) {
    res.status(500).send({ msg: messages.RMB_NOT_ADDED });
  }
};

exports.getRmbTrans = async function (req, res) {
  let { user_id } = req.params;
  try {
    const rmbTrans = await db.ReimbTrans.findAll({
      where: {
        user_id,
      },
    });
    if (rmbTrans.length === 0) {
      return res.status(404).send({ msg: messages.RMB_NOT_FOUND });
    }
    res.status(200).send(rmbTrans);
  } catch (error) {
    res.status(500).send({ msg: messages.RMB_NOT_GET });
  }
};
