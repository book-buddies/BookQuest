import React, { useContext } from 'react';
import { render } from 'react-dom';
import BookCard from '../Components/BookCard.jsx';
import { BookContext } from './MainDisplay.jsx';

export default function ResultsContainer() {
  const context = useContext(BookContext);
  const bookCards = [];
  //iterating through response state after it updates, for each object create a BookCard and push to bookCards
  return (
    <ul className='resultsContainer'>
      {/* {bookCards}
      {
      context.searchResults.map((book) => (
        <BookCard/>
      ))
      } */}
    </ul>
  );
}

// {
//   hikesData.reverse().map((hike) => (
//     <HikeCard key={uuid()} /*editHikes= {editHikes}*/ deleteHikes={deleteHikes} hike={hike} />
//   ))
// }