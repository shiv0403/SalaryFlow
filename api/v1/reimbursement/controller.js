const db = require("../../../config/sequelize");
const messages = require("./messages.json");

exports.addReimb = async function (req, res) {
  let { rmb_receipt, rmb_reason, user_id, isClaimed } = req.body;
  try {
    const reimb = await db.Reimbursement.create({
      rmb_receipt,
      rmb_reason,
      user_id,
      isClaimed,
    });
    res.status(201).send(reimb);
  } catch (error) {
    res.status(500).send({ msg: messages.RMB_NOT_ADDED });
  }
};

exports.getUserReimb = async function (req, res) {
  let { user_id } = req.params;
  try {
    const reimbursements = await db.Reimbursement.findAll({
      where: {
        user_id,
      },
    });
    res.status(200).send(reimbursements);
  } catch (error) {
    res.status(500).send({ msg: messages.RMB_NOT_GET });
  }
};

exports.getReimb = async function (req, res) {
  let { reimb_id } = req.params;
  try {
    const reimbursement = await db.Reimbursement.findOne({
      where: {
        id: reimb_id,
      },
    });
    res.status(200).send(reimbursement);
  } catch (error) {
    res.status(500).send({ msg: messages.RMB_NOT_GET });
  }
};

exports.updateReimb = async function (req, res) {
  let { reimb_id, isClaimed } = req.body;
  try {
    const reimbursement = await db.Reimbursement.update(
      {
        isClaimed,
      },
      {
        where: {
          id: reimb_id,
        },
      }
    );
    res.status(200).send({ msg: messages.RMB_UPDATED });
  } catch (error) {
    res.status(500).send({ msg: messages.RMB_NOT_UPDATE });
  }
};
