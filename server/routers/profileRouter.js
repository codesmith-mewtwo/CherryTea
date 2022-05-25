// Router for profile setup - add, update, remove charities
// Require dependencies and set up router
const express = require('express');
const router = express.Router();

// Require controllers
const profileController = require('../controllers/profileController');
const charityController = require('../controllers/charityController');

// Get route to profile - based on UUID (cookie) will get a list of charities, update them all in the db
// per most recent CN API info, and send the info for each charity out to client 
router.get('/', profileController.getProfile, charityController.getCharities, (req, res) => {
  return res.status(200).send(res.locals.profile);
});

// Post route to profile - for adding charities
// First updates all charities on user's profile, adding a charity per the request body
// Then, subscribes the user to that charity (addCharity middleware)
// Then, updates them all again and sends info back out to client
// TODO: please note this middleware chain is /very/ inefficient. Currently, a charity cannot be added 
// to a user's list until it exists in the database. To UPSERT the charities in the database, we are
// reusing the getCharities middleware. However, after the charity is added it still needs to be 
// linked to the user and then sent back out. Currently, this method takes advantage of already
// written middleware functions to cut down on development time but it is NOT optimum in terms of API
// and database calls. 
router.post('/', profileController.getProfile, charityController.getCharities, profileController.addCharity, profileController.getProfile, charityController.getCharities, (req, res) => {
  return res.status(200).send(res.locals.profile);
});

// Delete route to profile - removes a charity from user's profile, then updates all charities
// and returns updated charities.
// TODO: see note in above todo - this middleware chain is also not optimum. Future dev 
// recommendation: caching :D
router.delete('/', profileController.removeCharity, profileController.getProfile, charityController.getCharities, (req, res) => {
  return res.status(200).send(res.locals.profile);
});
module.exports = router;