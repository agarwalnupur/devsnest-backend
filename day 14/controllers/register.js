const User = require("../models/user");
// (For psql)
// const User = require("../models/mongo"); // For mongo

const bcrypt = require("bcrypt");
const saltRounds = 10;

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const alreadyExists = await User.findOne({ where: { email } });
    if (alreadyExists) {
      res.status(401).send("email already exists");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email: email.toLowerCase(),
      password: hash,
      fullName: "Nupur",
    });
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

const registerSuperAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const alreadyExists = await User.findOne({ where: { email } });
    if (alreadyExists) {
      res.status(401).send("email already exists");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email: email.toLowerCase(),
      password: hash,
      fullName: "Nupur",
      role: "Super-admin",
    });
    const savedUser = await newUser.save();
    req.session.User = savedUser;
    res.status(201).send(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports = { register, registerSuperAdmin };
