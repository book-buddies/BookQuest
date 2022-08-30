import React, { useState, createContext } from 'react';
import { render } from 'react-dom';
import ResultsContainer from './ResultsContainer'
import {NavBar} from './NavBar'


// const UserContext = createContext<{
//   context: string | null,
//   setContext: (newValue) => void
// }>({
//   context: null,
//   setContext: () => undefined
// })

// set the type of state you want to handle with context e.g
// interface searchResultState {
//   searchResults: string | null;
//   setSearchResults: (newValue: string) => void
// }
interface searchResultContextType {
  searchResults: string | null;
  setSearchResults: React.Dispatch<React.SetStateAction<string | null>>
}

const searchResultState = {
  searchResults: null as null,
  setSearchResults: () => {}
}

//set an empty object as default state
// export const BookContext = createContext({} as searchResultState);
export const BookContext = createContext<searchResultContextType>(searchResultState);



export const MainDisplay = () => {

const [searchResults, setSearchResults] = useState<string | null>(null);


  return (
    <BookContext.Provider value={{searchResults,setSearchResults}}>
      <NavBar/>
      {searchResults || 'no state yet'}
      <ResultsContainer/>
    </BookContext.Provider>
  );
}

