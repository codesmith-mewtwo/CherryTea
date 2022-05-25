const db = require('../models/dbModel');
const cookieController = {};


// setUUIDCookie is last in the middleware chain on signup or login,
// will take the user's UUID after successful login or signup
// and place it on a cookie for future use 

cookieController.setUUIDCookie = (req, res, next) => {
  // write code here
  const uuid = res.locals.UUID;
  res.cookie('uuid', uuid, {httpOnly: true})
  next();
}

module.exports = cookieController;
