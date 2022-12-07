const db = require("../../../config/sequelize");
const messages = require("./messages.json");

exports.addUserBank = async function (req, res) {
  let { user_id, bank_id, acc_no, bank_ifsc } = req.body;
  try {
    const userBank = await db.UserBank.create({
      user_id,
      bank_id,
      acc_no,
      bank_ifsc,
    });
    res.status(201).send(userBank);
  } catch (error) {
    res.status(500).send({ msg: messages.USER_BANK_NOT_ADDED });
  }
};

exports.getUserBank = async function (req, res) {
  let { user_id } = req.params;
  try {
    const userBank = await db.UserBank.findOne({
      include: [
        {
          model: db.Bank,
          as: "bank",
          attributes: ["bank_name", "bank_logo"],
        },
      ],
      where: {
        user_id,
      },
    });
    res.status(200).send(userBank);
  } catch (error) {
    res.status(500).send({ msg: messages.USER_BANK_NOT_GET });
  }
};
