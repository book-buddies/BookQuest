import { useState, useContext } from 'react'
import React from 'react';
import { render } from 'react-dom';
import { BookContext } from './MainDisplay'
import { axios } from 'axios';
export const NavBar = () => {
  const context = useContext(BookContext)

  async function handleSubmit(e){
    //for forms, use preventDefault to prevent submitting from automatically refreshing the page
    e.preventDefault();
    console.log('stop clicking me you jerk!');
    // (document.getElementById('bookSearch') as HTMLInputElement).value
    const bookSearch = document.getElementById('bookSearch');
    // console.log(bookSearch.value)
    const queryString = format(bookSearch.value);
    console.log('queryString: ', queryString);
    const response = await axios.get(`/api/${queryString}`);
    console.log('THIS IS YOUR DATA FROM THE BACKEND: ', response)
    // const data = 'dummydata' + (Math.random() * 100 ).toString();
    // console.log('dummydata before updating state: ', data)
    // console.log(typeof data)
    //fetch request to backend with booksearch parameters
    //get object with results back
    context.setSearchResults(response)
    console.log('did this shit work',context.searchResults)
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