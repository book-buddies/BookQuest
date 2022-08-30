import { NextFunction, Request, Response } from "express";
import path from "path";
import axios from "axios";
import { resourceLimits } from "worker_threads";
import { isNamedExportBindings } from "typescript";


interface BookData {
  title: string;
  author: string;
  author_key: string;
  isbn: number;
}

export const bookController = {
  getTitle: async (req: Request, res: Response, next: NextFunction) => {
    const openLibrary = "http://openlibrary.org/search.json?";

    try {
      const parsed = parseInt(req.params.input);

      if (!isNaN(parsed)) return next(); //if it's a number, move on

      const bookData = await axios
        .get(`${openLibrary}title=${req.params.input}`);
      res.locals.bookData = {
        title: bookData.data.docs[0].title, //string
        author: bookData.data.docs[0].author_name[0], //string
        author_key: bookData.data.docs[0].author_key[0], //string
        isbn: parseInt(bookData.data.docs[0].isbn[0]), //number
      };
      console.log("bookData in getTitle: ", res.locals.bookData);

      return next();
    } catch (err) {
      return next({
        log: "Error getting book data, nerd",
        status: 404,
        message: "You have an error getting book data: " + err,
      });
    }
  },

  getISBN: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = parseInt(req.params.input);
      if (isNaN(parsed)) return next(); //if it's a string, move on

      const openLibraryISBN = "http://openlibrary.org/isbn/";

      const isbnBookData = await axios.get(
        `${openLibraryISBN}${req.params.input}.json`,
      );

      const authorData = await axios.get(
        `https://openlibrary.org${isbnBookData.data.authors[0].key}.json`,
      );

      res.locals.bookData = {
        title: isbnBookData.data.title,
        author: authorData.data.name,
        author_key: isbnBookData.data.authors[0].key,
        isbn: req.params.input,
      };

      console.log(res.locals.bookData);
      return next();
    } catch (err) {
      return next({
        log: "Error getting isbn data, nerd",
        status: 404,
        message: "You have an error getting isbn data: " + err,
      });
    }
  },
};