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

    const updatedUser = await db.User.update(
      {
        user_bacc_id: userBank.id,
      },
      {
        where: {
          id: user_id,
        },
      }
    );
    res.status(201).send(userBank);
  } catch (error) {
    res.status(500).send({ msg: messages.USER_BANK_NOT_ADDED });
  }
};

exports.updateUserBank = async function (req, res) {
  let { user_id, ifsc_code, acc_no, bank_id } = req.body;
  try {
    const updatedBank = await db.UserBank.update(
      {
        bank_ifsc: ifsc_code,
        acc_no,
        bank_id,
      },
      {
        where: {
          user_id,
        },
      }
    );
    res.status(200).send({ msg: messages.USER_BANK_UPDATED });
  } catch (error) {
    res.status(500).send({ msg: messages.USER_BANK_NOT_UPDATED });
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
