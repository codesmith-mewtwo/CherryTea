const express = require('express');
const profileController = require('../controllers/profileController');
const charityController = require('../controllers/charityController');

const router = express.Router();

router.get('/', profileController.getProfile, charityController.getCharities, (req, res) => {
  return res.status(200).send(res.locals.profile);
});

router.post('/', profileController.addCharity, (req, res) => {
  return res.status(200).send(res.locals.profile);
});

router.delete('/', profileController.removeCharity, (req, res) => {
  return res.status(200).send(res.locals.profile);
});
module.exports = router;