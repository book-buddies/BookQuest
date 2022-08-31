import React, { useContext } from 'react';
import { render } from 'react-dom';
import BookCard from '../Components/BookCard.jsx';
import { BookContext } from './MainDisplay.jsx';


export default function ResultsContainer() {
  const context = useContext(BookContext);
  // const bookCards = [];
  const resultsArray = context.searchResults;
  console.log('resultsArray: ', resultsArray)
  //iterating through response state after it updates, for each object create a BookCard and push to bookCards
  return (
    <>
    <ul className='resultsContainer'>
      {
      resultsArray.map((book) => (
        <BookCard key={book.ISBN} info={book}/>
      ))
      } 
    </ul>
    </>
  );
}

// {
//   hikesData.reverse().map((hike) => (
//     <HikeCard key={uuid()} /*editHikes= {editHikes}*/ deleteHikes={deleteHikes} hike={hike} />
//   ))
// }