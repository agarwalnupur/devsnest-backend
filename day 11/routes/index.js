var express = require('express');
var router = express.Router();
const RegisterInitialCheck = require('../middlewares/RegisterCheck');
const register = require('../controllers/register')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',RegisterInitialCheck,register)

module.exports = router;
