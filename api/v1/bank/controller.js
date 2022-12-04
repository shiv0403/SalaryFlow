const db = require("../../../config/sequelize");
const logger = require("../../../helper/logger");
const messages = require("./messages.json");

exports.addBank = async function (req, res) {
  let { bank_name, bank_logo } = req.body;
  console.log(req.body);
  try {
    const bank = await db.Bank.create({
      bank_name,
      bank_logo,
    });
    res.status(201).send(bank);
  } catch (error) {
    logger.warn(error.message);
    res.status(500).send({ msg: messages.BANK_NOT_ADDED });
  }
};

exports.getBanks = async function (req, res) {
  try {
    const banks = await db.Bank.findAll();
    res.status(200).send(banks);
  } catch (error) {
    res.status(500).send({ msg: messages.BANK_NOT_GET });
  }
};
