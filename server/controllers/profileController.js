const db = require('../models/dbModel');
const profileController = {};

profileController.getProfile = (req, res, next)=>{

  // Get profile will store an array of charity names on res.locals, for use in the next middleware
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

profileController.addCharity = (req, res, next)=>{
  const {uuid} = req.cookies;
  const {charityName} = req.body;
  const query = `
  INSERT INTO users_charities (user_id, charity_id)
  VALUES ('${uuid}', (SELECT _id FROM charities WHERE name = '${charityName}'))
  ;`
  db.query(query)
  .then(data => {
    next();
  })
  .catch(err => {
    next(err);
  });
}

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