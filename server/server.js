// Server setup
require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Required routers
const authRouter = require('./routers/authRouter');
const profileRouter = require('./routers/profileRouter');

// Route handlers
app.use('/auth', authRouter);
app.use('/profile', profileRouter);


// Check if running in production, use build if so
if (process.env.NODE_ENV === "production"){

  // statically serve everything in the build folder on the route '/dist'
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
  });
}

//Unknown Route Handler
app.get('/*', (req, res) => {
  return res.status(404).send('404 - No CherryTeas Found!');
});

//Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, (err) => {
  console.log(new Date(), err || 'Server listening on port ' + PORT);
});
