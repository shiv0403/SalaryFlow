const db = require("../../../config/sequelize");
const messages = require("./messages.json");
const { Op } = require("sequelize");
const logger = require("../../../helper/logger");
const Sequelize = require("sequelize");

exports.addSalaryTrans = async function (req, res) {
  let { userIds, org_id, remark } = req.body;
  try {
    const salaryTrans = await db.SalaryTrans.create({
      user_ids: userIds.toString(),
      org_id,
      remark,
    });
    res.status(201).send(salaryTrans);
  } catch (error) {
    res.status(500).send({ msg: messages.TRANS_NOT_COMPLETED });
  }
};

exports.getSalaryTrans = async function (req, res) {
  let { org_id } = req.params;
  try {
    const transactions = await db.SalaryTrans.findAll({
      where: {
        org_id,
      },
    });
    let result = [];
    for (let i = 0; i < transactions.length; ++i) {
      const userIdArr = JSON.parse("[" + transactions[i].user_ids + "]");
      const userData = await db.User.findAll({
        include: [
          {
            model: db.UserBank,
            as: "userBank",
          },
        ],
        attributes: ["f_name", "l_name"],
        where: {
          id: userIdArr,
        },
      });
      result.push({ transaction: transactions[i], userData });
    }

    res.status(200).send(result);
  } catch (error) {
    logger.warn(error.message);
    res.status(500).send({ msg: messages.TRANS_NOT_GET });
  }
};

exports.getSalaryTransUser = async function (req, res) {
  let { user_id } = req.params;
  let userId = user_id.toString();
  try {
    const trans = await db.SalaryTrans.findAll({
      include: [
        {
          model: db.UserBank,
          as: "companyBank",
          attributes: ["acc_no", "bank_ifsc"],
          include: [
            {
              model: db.Bank,
              as: "bank",
            },
          ],
        },
      ],
      where: {
        user_ids: {
          [Op.like]: `%${userId}%`,
        },
      },
    });

    const userDetails = await db.User.findOne({
      attributes: ["f_name", "l_name"],
      include: [
        {
          model: db.UserBank,
          as: "userBank",
        },
      ],
      where: {
        id: user_id,
      },
    });

    //company_bank_details
    res.status(200).send({ trans, userDetails });
  } catch (error) {
    logger.warn(error.message);
    res.status(500).send({ msg: messages.TRANS_NOT_GET });
  }
};
