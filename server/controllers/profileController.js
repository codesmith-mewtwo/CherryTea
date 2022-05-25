const db = require('../models/dbModel');
const profileController = {};

// getProfile middelware - takes user's UUID and returns an array of charities this user is subscribed
// to by name. Places this array on res.locals for use in next middleware
profileController.getProfile = (req, res, next)=>{
  const {uuid} = req.cookies;
  const query = `
  SELECT name FROM charities
  INNER JOIN users_charities ON users_charities.charity_id = charities._id
  WHERE user_id = '${uuid}'
  ;`
  db.query(query)
  .then(data => {
    res.locals.charityNames = data.rows;
    next();
  })
  .catch(err => {
    next(err);
  });
}

// addCharity middleware - takes UUID and charityname from request and joins 
// user with charity in database 
profileController.addCharity = (req, res, next)=>{
  const {uuid} = req.cookies;
  let {charityName} = req.body;
  charityName = charityName.toLowerCase();
  const query = `
  INSERT INTO users_charities (user_id, charity_id)
  SELECT '${uuid}', (SELECT _id FROM charities WHERE name = '${charityName}')
  WHERE NOT EXISTS (SELECT * from users_charities WHERE user_id = '${uuid}' AND charity_id = (SELECT _id FROM charities WHERE name = '${charityName}'))
  ;`
  db.query(query)
  .then(data => {
    next();
  })
  .catch(err => {
    next(err);
  });
}

// removeCharity middleware - takes UUID and charityname from request and unjoins 
// user with charity in database
// TODO: this doesn't remove the charity from the database, just unlinks the user
// from it. Storage space isn't free so we should probably add middleware to remove
// the charity itself too
profileController.removeCharity = (req, res, next)=>{
  const {uuid} = req.cookies;
  const {charityName} = req.body;
  const query = `
  DELETE FROM users_charities 
  WHERE user_id = '${uuid}' AND charity_id = (SELECT _id FROM charities WHERE name = '${charityName}')
  ;`
  db.query(query)
  .then(data => {
    next();
  })
  .catch(err => {
    next(err);
  });
}


module.exports = profileController;