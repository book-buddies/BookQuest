import express, { Request, Response, NextFunction, RequestHandler } from 'express';

const PORT = 3000;

interface ServerError {
  log: string
  status: number
  message: {err: string}
};

const app = express();

app.use(express.json());





app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})