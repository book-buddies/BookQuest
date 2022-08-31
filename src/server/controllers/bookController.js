// import path from "path";
// import axios from "axios";
// import { Book } from "../Model.js"

const path = require('path');
const axios = require('axios');
const Book = require('../Model');
const mongoose = require('mongoose')



// let didSearch = false;

module.exports = bookController = {
  getTitle: async (req, res, next) => {

    const openLibrary = "http://openlibrary.org/search.json?";
    res.locals.didSearch = false;
    try {
      //function to change lower case and pluses to pascalcase and with spaces
      const changePlusToSpace = (str) => {
        const strArr = str.split('');
        for (let i = 0; i < strArr.length; i++) {
          if (i === 0) strArr[i] = strArr[i].toUpperCase();
          if (strArr[i] === '+') {
            strArr[i] = ' ';
            strArr[i+1] = strArr[i+1].toUpperCase();
          }
        }
        return strArr.join('');
      }
      //if it's a number, move on
      const parsed = parseInt(req.params.input);
      if (!isNaN(parsed)) return next(); 

      const { input } = req.params;

      //query db and if present from db, send to client, if not, query API
      const changedInput = changePlusToSpace(input);
      const dbfind = await Book.find({title: changedInput})
      if (dbfind.length === 0) {
        res.locals.didSearch = true;
        console.log(res.locals.didSearch);
        const bookData = await axios.get(`${openLibrary}title=${req.params.input}`);
        res.locals.bookData = [{
          title: bookData.data.docs[0].title, //string
          author: bookData.data.docs[0].author_name[0], //string
          author_key: bookData.data.docs[0].author_key[0], //string
          isbn: parseInt(bookData.data.docs[0].isbn[0]), //number
        }];
        return next();
      }
      else {
        res.locals.bookData = dbfind;
        return next();
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

  getISBN: async (req, res, next) => {
    try {

      const parsed = parseInt(req.params.input);
      if (isNaN(parsed)) return next(); //if it's a string, move on
      const { input } = req.params
      //if not in db, pull from api via 2 calls to get author and other relavent information. If in db, pull from DB
      const openLibraryISBN = "http://openlibrary.org/isbn/";
      const dbfind = await Book.find({isbn: input})
      if (dbfind.length === 0) {
        res.locals.didSearch = true;
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
        
        return next();
      }
      else {
        res.locals.bookData = dbfind;
        return next();
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

  postToDb: async (req, res, next) => {
    //if API was requested, we post to DB
    if (res.locals.didSearch) {
      //post to db
      try {
        Book.create(res.locals.bookData);
        next();
      }
      catch (err) {
        return next({
          log: "Error posting data to db, nerd",
          status: 404,
          message: "You have an error posting data to db, nerd: " + err,
        });
      }
    }
    //else just move on, no need to post DB to send to 
    else {
      return next();
    }
  },
};


