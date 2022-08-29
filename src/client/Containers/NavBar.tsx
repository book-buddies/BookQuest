import { useState } from 'react'
import React from 'react';
import { render } from 'react-dom';

export default function NavBar() {

    function handleSubmit(e: React.SyntheticEvent<EventTarget>){
      //for forms, use preventDefault to prevent submitting from automatically refreshing the page
      e.preventDefault();
      console.log('stop clicking me you jerk!');
      
    }
  
    return (
      <>
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
      </>
    );
  }