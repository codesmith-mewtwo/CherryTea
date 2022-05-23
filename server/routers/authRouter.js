const express = require('express');
const authController = require('../controllers/authController');

const app = require('../server');
const router = express.Router();

//sign up
router.post('/signup', authController.signUp, (req, res) => {
  return res.sendStatus(200);
});