const authController = {}
const db = require('../models/dbModel')

authController.signUp = ((req, res, next)=>{
  const {username=null, password=null} = req.body;
  const newUser = [username, password];
  const query = `INSERT INTO users (username, password)
  VALUES ($1, $2)
  RETURNING _id
  ;`
  db.query(query, newUser)
  .then(data => {
    res.locals.UUID = data.rows[0]._id;
    next();
  })
  .catch(err => {
    next(err);
  });
})

authController.logIn = ((req, res, next)=>{
  const {username=null, password=null} = req.body;
  const user = [username, password];
  const query = `
    SELECT * FROM users
    WHERE username = $1 AND password = $2
  ;`
  db.query(query, user)
  .then(data => {
    res.locals.UUID = data.rows[0]._id
    if (data.rowCount === 0){next(`username or password incorrect`)}
    next();
  })
  .catch(err => {
    next(err);
  });
})
module.exports = authController;