const db = require("../../../config/sequelize");
const { hashPassword, comparePasswords } = require("../../../helper/utils");
const jwt = require("jsonwebtoken");
const messages = require("./messages.json");
const logger = require("../../../helper/logger");
const moment = require("moment");
const config = require("../../../config/env/development.json");

// @desc : ONLY FOR ADMINS
// @access : public
exports.signup = async function (req, res) {
  let {
    f_name,
    l_name,
    email,
    password,
    org_name,
    profile_img,
    emps,
    org_logo,
  } = req.body;

  const hashPass = hashPassword(password);

  try {
    //add-admin
    const user = await db.User.create({
      f_name,
      l_name,
      email,
      password: hashPass,
      profile_img,
      isAdmin: 1,
      doj: moment(),
    });

    //add-org
    const org = await db.Organisation.create({
      org_name,
      user_id: user.id,
      emps,
      org_logo,
      auto_pay: 0,
    });

    await db.User.update(
      {
        org_id: org.id,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      config.jwt.JWT_SECRET
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: config.jwt.MAX_AGE,
    });
    return res.status(201).send({ user, org });
  } catch (error) {
    res.status(500).send({ err: messages.USER_NOT_CREATED });
  }
};

//@desc : for all users
//@access : registered / invited users
exports.login = async function (req, res) {
  let { email, password } = req.body;

  let errors = { email: "", password: "" };

  try {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });

    if (user === null) {
      errors.email = messages.USER_NOT_FOUND;
      return res.status(401).send(errors);
    }

    const isUser = comparePasswords(password, user.password);

    if (isUser) {
      const token = jwt.sign({ userId: user.id }, config.jwt.JWT_SECRET);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: config.jwt.maxAge,
      });
      res.status(200).send(user);
    } else {
      errors.password = messages.PASSWORD_INCORRECT;
      return res.status(401).send(errors);
    }
  } catch (error) {
    res.status(500).send({ err: messages.USER_NOT_LOGGED_IN });
  }
};

exports.addEmp = async function (req, res) {
  let { f_name, l_name, email, pos_id, dept_id, doj, org_id } = req.body;
  try {
    const emp = await db.User.create({
      f_name,
      l_name,
      email,
      password: hashPassword("test"),
      isAdmin: 0,
      pos_id,
      dept_id,
      org_id,
      doj,
    });

    //also mail the emp their creds
    res.status(201).send(emp);
  } catch (error) {
    res.status(500).send({ msg: messages.EMP_NOT_ADDED });
  }
};

exports.addOrgEmps = async function (req, res) {
  let { emps_data } = req.body;
  try {
  } catch (error) {
    res.status(500).send({ msg: messages.EMP_NOT_ADDED });
  }
};

//@desc : only for admin
exports.updateUser = async function (req, res) {};

exports.getOrgEmps = async function (req, res) {
  let { org_id } = req.params;
  try {
    const emps = await db.User.findAll({
      include: [
        {
          model: db.Position,
          as: "position",
        },
        {
          model: db.Department,
          as: "department",
        },
      ],
      where: {
        org_id,
      },
    });
    res.status(200).send(emps);
  } catch (error) {
    res.status(500).send({ msg: messages.EMPS_NOT_GET });
  }
};

exports.logout = async function (req, res) {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).send({ msg: "logged out" });
};
