import React, { useContext } from 'react';
import { render } from 'react-dom';
import BookCard from '../Components/BookCard';
import { BookContext } from './MainDisplay';

export default function ResultsContainer() {
  const context = useContext(BookContext);
  return (
    <ul className='resultsContainer'>
      <BookCard/>
    </ul>
  );
}