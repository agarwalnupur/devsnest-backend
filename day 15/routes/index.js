var express = require("express");
var router = express.Router();
var RegisterInitialCheck = require("../middlewares/RegisterCheck");
var { register, registerSuperAdmin } = require("../controllers/register");
var check = require("../middlewares/checkSuperAdmin");
/* GET home page. */
router.get("/", function (req, res, next) {
  const sess = req.session;
  sess.username = "nupur";

  res.render("index", { title: "Express" });
});
router.get("/test", function (req, res, next) {
  console.log("Redis value", req.session.username);

  res.render("index", { title: "Express" });
});

router.post("/register", RegisterInitialCheck, register);
router.post("/register-super-admin", RegisterInitialCheck, registerSuperAdmin);
router.get("/super", check);

module.exports = router;
