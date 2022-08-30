import { useState, useContext } from 'react'
import React from 'react';
import { render } from 'react-dom';
import { BookContext } from './MainDisplay'

export const NavBar = () => {
  const query = useContext(BookContext)

  function handleSubmit(e: React.SyntheticEvent<EventTarget>){
    //for forms, use preventDefault to prevent submitting from automatically refreshing the page
    e.preventDefault();
    console.log('stop clicking me you jerk!');
    // (document.getElementById('bookSearch') as HTMLInputElement).value
    const bookSearch = (document.getElementById('bookSearch') as HTMLInputElement);
    console.log(bookSearch.value)
    const data = 'dummydata' + (Math.random() * 100 ).toString();
    console.log('dummydata before updating state: ', data)
    // console.log(typeof data)
    //fetch request to backend with booksearch parameters
    //get object with results back
    query.setSearchResults(data)
    console.log('did this shit work',query.searchResults)
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