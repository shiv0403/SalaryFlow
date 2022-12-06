const db = require("../../../config/sequelize");
const logger = require("../../../helper/logger");
const messages = require("./messages.json");

exports.addDept = async function (req, res) {
  let { dept_name, org_id } = req.body;

  try {
    const dept = await db.Department.create({
      dept_name,
      org_id,
    });
    res.status(201).send(dept);
  } catch (error) {
    res.status(500).send({ msg: messages.DEPT_NOT_ADDED });
  }
};

exports.getDeptId = async function (req, res) {
  let { org_id, deptName } = req.params;
  try {
    const dept_id = await db.Department.findOne({
      attributes: ["id"],
      where: {
        org_id,
        dept_name: deptName,
      },
    });
    if (dept_id === null) {
      return res.status(404).send({ msg: messages.DEPT_NOT_FOUND });
    }
    res.status(200).send(dept_id);
  } catch (error) {
    logger.warn(error.message);
    res.status(500).send({ msg: messages.DEPT_ID_NOT_FOUND });
  }
};

exports.getDept = async function (req, res) {
  let { org_id } = req.params;
  try {
    const depts = await db.Department.findAll({
      where: {
        org_id,
      },
    });
    if (depts.length === 0) {
      return res.status(404).send({ msg: messages.DEPT_NOT_FOUND });
    }
    res.status(200).send(depts);
  } catch (error) {
    res.status(500).send({ msg: messages.DEPT_NOT_GET });
  }
};
