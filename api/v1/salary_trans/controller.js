const db = require("../../../config/sequelize");
const messages = require("./messages.json");

exports.addSalaryTrans = async function (req, res) {
  let { userIds, org_id } = req.body;
  try {
    const salaryTrans = await db.SalaryTrans.create({
      user_ids: userIds.toString(),
      org_id,
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
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send({ msg: messages.TRANS_NOT_GET });
  }
};
