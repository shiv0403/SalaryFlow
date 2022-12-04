const db = require("../../../config/sequelize");
const messages = require("./messages.json");

exports.addLeave = async function (req, res) {
  let { user_id, org_id, start_date, end_date, reason, isApproved } = req.body;
  try {
    const leave = await db.Leave.create({
      user_id,
      org_id,
      start_date,
      end_date,
      reason,
      isApproved,
    });
    res.status(201).send(leave);
  } catch (error) {
    res.status(500).send({ msg: messages.LEAVE_NOT_ADDED });
  }
};

exports.getLeave = async function (req, res) {
  let { leave_id } = req.params;
  try {
    const leave = await db.Leave.findOne({
      where: {
        id: leave_id,
      },
    });
    if (leave === null) {
      return res.status(404).send({ msg: messages.LEAVE_NOT_FOUND });
    }
    res.status(200).send(leave);
  } catch (error) {
    res.status(500).send({ msg: messages.LEAVE_NOT_GET });
  }
};

exports.getLeaves = async function (req, res) {
  let { user_id } = req.params;
  try {
    const leaves = await db.Leave.findAll({
      where: {
        user_id,
      },
    });
    if (leaves.length === 0) {
      return res.status(404).send({ msg: messages.LEAVE_NOT_FOUND });
    }
    res.status(200).send(leaves);
  } catch (error) {
    res.status(500).send({ msg: messages.LEAVES_NOT_GET });
  }
};

exports.updateLeaveStatus = async function (req, res) {
  let { leave_id, isApproved } = req.body;
  try {
    const leave = await db.Leave.update(
      {
        isApproved,
      },
      {
        where: {
          id: leave_id,
        },
      }
    );
    res.status(200).send({ msg: messages.LEAVE_STATUS_UPDATED });
  } catch (error) {
    res.status(500).send({ msg: messages.LEAVE_STATUS_NOT_UPDATED });
  }
};
