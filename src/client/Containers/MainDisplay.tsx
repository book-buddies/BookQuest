import React, { useState, createContext } from 'react';
import { render } from 'react-dom';
import ResultsContainer from './ResultsContainer'
import NavBar from './NavBar'


interface ContextState {
  name: string | null;
}
// const BookContext = createContext <string | null>(null);
const BookContext = createContext({} as ContextState);

const [searchResults, setSearchResults] = useState('')

export default function MainDisplay() {


  function updateResults(){
    console.log('hi');
    // setQuery('hi');
  }
  return (
    <BookContext.Provider value={searchResults}>
      <NavBar/>
      <ResultsContainer/>
    </BookContext.Provider>
  );
}

