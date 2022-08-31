import { NextFunction, Request, Response } from "express";
import path from "path";
import axios from "axios";
import { resourceLimits } from "worker_threads";
import { isNamedExportBindings } from "typescript";
import { Book } from '../Model.js';
import { title } from "process";


interface BookData {
  title: string;
  author: string;
  author_key: string;
  isbn: number;
}

export const bookController = {
  getTitle: async (req: Request, res: Response, next: NextFunction) => {
    const openLibrary = "http://openlibrary.org/search.json?";
    
    res.locals.didSearch = false;

    try {
      //if it's a number, move on
      const parsed = parseInt(req.params.input);
      if (!isNaN(parsed)) return next(); 
      
      //query db and if present from db, send to client, if not, query API
      const dbfind = await Book.find(req.params.input)
      if (dbfind.length === 0) {
        const bookData = await axios.get(`${openLibrary}title=${req.params.input}`);
        res.locals.bookData = [{
          title: bookData.data.docs[0].title, //string
          author: bookData.data.docs[0].author_name[0], //string
          author_key: bookData.data.docs[0].author_key[0], //string
          isbn: parseInt(bookData.data.docs[0].isbn[0]), //number
        }];
        res.locals.didSearch = true;
        return next();
      }
      else {
        res.locals.bookData = dbfind;
      }
    } 
    //catch any errors
    catch (err) {
      return next({
        log: "Error getting book data, nerd",
        status: 404,
        message: "You have an error getting book data: " + err,
      });
    }
  },

  getISBN: async (req: Request, res: Response, next: NextFunction) => {
    try {

      res.locals.didSearch = false;

      const parsed = parseInt(req.params.input);
      if (isNaN(parsed)) return next(); //if it's a string, move on

      //if not in db, pull from api via 2 calls to get author and other relavent information. If in db, pull from DB
      const openLibraryISBN = "http://openlibrary.org/isbn/";
      const dbfind = await Book.find(req.params.input)
      if (dbfind.length === 0) {
        const isbnBookData = await axios.get(
          `${openLibraryISBN}${req.params.input}.json`,
        );
  
        const authorData = await axios.get(
          `https://openlibrary.org${isbnBookData.data.authors[0].key}.json`,
        );
  
        res.locals.bookData = [{
          title: isbnBookData.data.title,
          author: authorData.data.name,
          author_key: isbnBookData.data.authors[0].key,
          isbn: req.params.input,
        }];
        res.locals.didSearch = true;
        return next();
      }
      else {
        res.locals.bookData = dbfind;
      }

    } 
    //catch any errors
    catch (err) {
      return next({
        log: "Error getting isbn data, nerd",
        status: 404,
        message: "You have an error getting isbn data: " + err,
      });
    }
  },

  postToDb: async (req: Request, res: Response, next: NextFunction) {
    //if API was requested, we post to DB
    if (!res.locals.didSearch) {
      //post to db
    }
    //else just move on, no need to post DB to send to 
    else {
      return next();
    }
  },
};