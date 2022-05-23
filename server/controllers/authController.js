const authController = {}

authController.signUp = ((req, res, next)=>{
  const {username=null, password=null} = req.body;
  const newUser = [username, password];
  const query = `INSERT INTO users (username, password)
  VALUES ($1, $2)
  ;`

  db.query(query, newUser)
  .then(data => {
    next();
  })
  .catch(err => {
    next(err);
  });
})

module.exports = authController;