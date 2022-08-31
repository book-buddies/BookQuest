import { useState, useContext } from 'react'
import React from 'react';
import { render } from 'react-dom';
import { BookContext } from './MainDisplay.jsx'
import axios from 'axios';
// import fetch from 'node-fetch';

export const NavBar = () => {
  const context = useContext(BookContext)

  async function handleSubmit(e){
    //for forms, use preventDefault to prevent submitting from automatically refreshing the page
    e.preventDefault();
    // console.log('stop clicking me you jerk!');
    // (document.getElementById('bookSearch') as HTMLInputElement).value
    const bookSearch = document.getElementById('bookSearch');
    // // console.log(bookSearch.value)
    const queryString = format(bookSearch.value);
    console.log('queryString: ', queryString);
    // console.log('inside getRequest function');
    const response = await axios.get(`/api/${queryString}`);
    // fetch(`https://openlibrary.org/books/OL7353617M.json`)
    // fetch(`/api/the+hobbit`)
    // .then(data=>data.json())
    // .then(result => console.log('data repsonse: ', result))
    // .catch(err=> console.log(err));
    // let response = await axios.get(`http://localhost:8080/api/${queryString}`);
    // let response = await axios({
    //   method: 'get',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   url: `http://localhost:8080/api/${queryString}`,
    //   withCredentials: false,
    //   // params: {
    //   //   access_token: SECRET_TOKEN,
    //   // },
    // });
    // const response = await axios.get('https://openlibrary.org/books/OL7353617M.json');
    
    console.log('THIS IS YOUR DATA FROM THE BACKEND: ', response.data)
    // const data = 'dummydata' + (Math.random() * 100 ).toString();
    // console.log('dummydata before updating state: ', data)
    // console.log(typeof data)
    //fetch request to backend with booksearch parameters
    //get object with results back
    context.setSearchResults(response.data)
    // context.setSearchResults(data)
    // console.log('did this shit work',context.searchResults[0].title)
  }

  function format(info) {
    let formattedInfo = '';
    for (const char of info) {
      if(char === ' ') {
        formattedInfo += '+';
      } else formattedInfo += char;
    }
    return formattedInfo; 
  }

  // async function getRequest(queryString){
  //   console.log('inside getRequest function');
  //   // const response = await axios.get(`/api/${queryString}`);
  //   // console.log('THIS IS YOUR DATA FROM THE BACKEND: ', response)
  //   const data = 'dummydata' + (Math.random() * 100 ).toString();
  //   // console.log('dummydata before updating state: ', data)
  //   // console.log(typeof data)
  //   //fetch request to backend with booksearch parameters
  //   //get object with results back
  //   // context.setSearchResults(response)
  //   context.setSearchResults(data)
  //   console.log('did this shit work',context.searchResults)
  // }

  return (
    <div className = 'nav'>
    <h1>BookQuest</h1>
    <h2>By BookBuddies</h2>
      <form action="">
        <input
        type='text'
        name='bookSearch'
        id='bookSearch'
        placeholder='title/author or ISBN'
        required
        />
        <input type='submit' name='submit' value='submit' onClick={handleSubmit}/>
      </form>
    </div>
  );
}