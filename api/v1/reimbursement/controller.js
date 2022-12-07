const { Sequelize } = require("sequelize");
const db = require("../../../config/sequelize");
const messages = require("./messages.json");
const { Op } = require("sequelize");

exports.addReimb = async function (req, res) {
  let { rmb_receipt, rmb_reason, user_id, org_id, isClaimed, remark } =
    req.body;
  try {
    const reimb = await db.Reimbursement.create({
      rmb_receipt,
      rmb_reason,
      user_id,
      org_id,
      remark,
      isClaimed,
    });
    res.status(201).send(reimb);
  } catch (error) {
    res.status(500).send({ msg: messages.RMB_NOT_ADDED });
  }
};

exports.getRmbOrg = async function (req, res) {
  let { org_id } = req.params;
  try {
    const reimbs = await db.Reimbursement.findAll({
      include: [
        {
          model: db.User,
          attributes: ["f_name", "l_name"],
          as: "user",
        },
      ],
      where: {
        org_id,
      },
    });

    let count_pending = 0,
      count_accepted = 0;
    for (let i = 0; i < reimbs.length; ++i) {
      if (reimbs[i].isClaimed === 0) {
        count_pending++;
      } else if (reimbs[i].isClaimed === 1) {
        count_accepted++;
      }
    }

    res.status(200).send({ reimbs, count_pending, count_accepted });
  } catch (error) {
    res.status(500).send({ msg: messages.RMB_NOT_GET });
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
