var express = require('express');
var router = express.Router();
const RegisterInitialCheck = require('../middlewares/RegisterCheck');
const register = require('../controllers/register')

/* GET home page. */
router.get('/', function(req, res, next) {
  const sess = req.session;
  sess.username = 'nupur';

  res.render('index', { title: 'Express' });
});
router.get('/test', function(req, res, next) {
  console.log('Redis value', req.session.username)

  res.render('index', { title: 'Express' });
});


router.post('/register',RegisterInitialCheck,register)

module.exports = router;
