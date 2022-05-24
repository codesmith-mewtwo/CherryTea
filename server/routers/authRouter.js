const express = require('express');
const authController = require('../controllers/authController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();

//sign up
router.post('/signup', authController.signUp, cookieController.setUUIDCookie, (req, res) => {
  return res.sendStatus(200);
});

router.post('/login', authController.logIn, cookieController.setUUIDCookie, (req, res) => {
  return res.sendStatus(200);
});


module.exports = router;