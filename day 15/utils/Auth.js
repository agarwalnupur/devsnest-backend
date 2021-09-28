const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/mongo");
const { SECRET } = require("../config");

const User = require("../models/user");

const userRegister = async (userDets, role, res) => {
  try {
    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        messgae: `Username already taken.`,
        success: false,
      });
    }

    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        messgae: `Email is already registered. `,
        success: false,
      });
    }

    const password = await bcrypt.hash(userDets.password, 12);

    const newUser = new User({
      ...userDets,
      password,
      role,
    });

    await newUser.save();
    return res.status(201).json({
      messgae: "YAyyyy! You are successfully registered",
      success: true,
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      messgae: "Unable to create uour account",
      success: false,
      err: err,
    });
  }
};

const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      messgae: `Username not found. Invalid Credentials.`,
      success: false,
    });
  }
  if (user.role !== role) {
    return res.status(403).json({
      messgae: `Please make sure you are logging in from the right role`,
      success: false,
    });
  }

  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
      SECRET,
      {
        expiresIn: "7 days",
      }
    );

    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };

    return res.status(200).json({
      ...result,
      message: "You are now logged in",
      success: true,
    });
  } else {
    return res.status(403).json({
      messgae: "incorrect password",
      success: false,
    });
  }
};

const userAuth = passport.authenticate("jwt", { session: false });

const checkRole = (roles) => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("unauthorised")
    : next();

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const serializeUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    name: user.name,
    _id: user._id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

module.exports = {
  userAuth,
  checkRole,
  userLogin,
  userRegister,
  serializeUser,
};
