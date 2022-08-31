import React, { useState, createContext, useEffect } from 'react';
import { render } from 'react-dom';
import ResultsContainer from './ResultsContainer.jsx'
import { NavBar } from './NavBar.jsx'

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
// interface searchResultContextType {
//   searchResults: {} | Object | null;
//   setSearchResults: React.Dispatch<React.SetStateAction<string | null>>
// }
// interface searchResultContextType {
//   searchResults: 
//   { title: string,
//     author: string,
//     author_key: string,
//     ISBN: string, } | null;
//   setSearchResults: React.Dispatch<React.SetStateAction<string | null>>
// }
// const searchResultState = {
//   searchResults: {
//     title: '',
//     author: '',
//     author_key: '',
//     ISBN: '',
//   },
//   setSearchResults: () => {}
// }

// type Result = {
//   title: string,
//   author: string,
//   author_key: string,
//   ISBN: string,
// }

//set an empty object as default state
// export const BookContext = createContext({} as searchResultState);
export const BookContext = createContext();

export const MainDisplay = () => {
const [searchResults, setSearchResults] = useState(null);

// const value = {searchResults, setSearchResults}
useEffect(()=>{
  // const title = searchResults.title
  // const title = searchResults[0].title;
  console.log('rendered main display')
}, [searchResults]);
let title;
if(searchResults) title = searchResults[0].title
  return (
    <BookContext.Provider value={{searchResults,setSearchResults}}>
      <NavBar/>
      {/* {title || ' '} */}
      {searchResults && <ResultsContainer/>}
    </BookContext.Provider>
  )
}