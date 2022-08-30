import { NextFunction, Request, Response } from 'express';
import path from 'path';

interface BookObj {
  getBook: void
  //another method
}


export const bookController = {
  getBook: (req: Request, res: Response, next: NextFunction) => {

  },
  //another method
}