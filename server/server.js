import express from 'express';
import path from 'path';
import authController from './controllers/authController';

const app = express()

const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


//Unknown Route Handler
app.get('/*', (req, res) => {
  return res.status(404).send('404 - No CherryTeas Found!');
});

//Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: {err: 'An error occurred'},
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, err => {
  console.log(new Date(), err || 'Server listening on port ' + PORT)
})

