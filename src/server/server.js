const express = require('express')
const bookController = require('./controllers/bookController')

// import express from 'express';
// import { bookController } from './controllers/bookController.js';

const PORT = 3000;

const app = express();

app.use(express.json());

app.use('/api/:input', bookController.getTitle, bookController.getISBN, 
  (req, res) =>{res.status(200).json(res.locals.bookData)})

app.get('/', (req, res) => {
  res.status(200).json('../client/components/index.html');
})

//global error handler
app.use('/', (err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 404,
    message: {
      err: err
    }
  }
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
})

//starting server
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})