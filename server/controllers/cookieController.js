const db = require('../models/dbModel');
const cookieController = {};

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setUUIDCookie = (req, res, next) => {
  // write code here
  const uuid = res.locals.UUID;
  res.cookie('uuid', uuid, {httpOnly: true})
  next();
}

module.exports = cookieController;
