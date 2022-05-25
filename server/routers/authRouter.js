// Router for authentication (signup, login)
// Require dependencies and set up router
const express = require('express');
const router = express.Router();

// Require controllers
const authController = require('../controllers/authController');
const cookieController = require('../controllers/cookieController');


//Sign up route - adds user to database and sets user's UUID on a cookie for later use (not ideal for security purposes but good for demo :))
router.post('/signup', authController.signUp, cookieController.setUUIDCookie, (req, res) => {
  return res.sendStatus(200);
});

// Log in route - checks for user in database and sets user's UUID on a cookie for later use (not ideal for security purposes but good for demo :))
router.post('/login', authController.logIn, cookieController.setUUIDCookie, (req, res) => {
  return res.sendStatus(200);
});

// TODO: add encryption on username and pw 

module.exports = router;