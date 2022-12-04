const db = require("../../../config/sequelize");
const logger = require("../../../helper/logger");
const messages = require("./messages.json");

exports.addPosition = async function (req, res) {
  let { pos_name, pos_base_pay, pos_ctc, org_id } = req.body;
  try {
    const position = await db.Position.create({
      pos_name,
      pos_base_pay,
      pos_ctc,
      org_id,
    });
    res.status(201).send(position);
  } catch (error) {
    res.status(500).send({ msg: messages.POSITION_NOT_ADDED });
  }
};

exports.getPosition = async function (req, res) {
  let { pos_id } = req.params;
  try {
    const position = await db.Position.findOne({
      where: {
        id: pos_id,
      },
    });
    res.status(200).send(position);
  } catch (error) {
    logger.warn(error.message);
    res.status(500).send({ msg: messages.POSITION_NOT_GET });
  }
};

exports.getPositions = async function (req, res) {
  let { org_id } = req.params;
  try {
    const positions = await db.Position.findAll({
      where: {
        org_id,
      },
    });
    res.status(200).send(positions);
  } catch (error) {
    res.status(500).send({ msg: messages.POSITIONS_NOT_GET });
  }
};
