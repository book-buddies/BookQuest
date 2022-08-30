import express, { Request, Response, NextFunction, RequestHandler } from 'express';

import { bookController } from './controllers/bookController';

const PORT = 3000;

interface ServerError {
  log: string
  status: number
  message: {err: string}
};

const app = express();

app.use(express.json());

// app.use('/api/', bookController)

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('../client/components/index.html');
})

//global error handler
app.use('/', (err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 404,
    message: {
      err: 'An error has occured'
    }
  }
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
})



//starting server
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})

