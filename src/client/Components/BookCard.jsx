import React, { useContext } from 'react';
import { render } from 'react-dom';
import { BookContext } from '../Containers/MainDisplay.jsx';

export default function ResultsContainer() {
  const {context} = useContext(BookContext);

  const ISBN = '0316067938'
    return (
      <div>
        Title: {context.searchResults.title}
        Author: {context.searchResults.author}
        ISBN: {context.searchResults.ISBN}
          <a href={`https://www.biblio.com/${ISBN}`} target='_blank'><button>Biblio button</button></a>
      </div>
    );
  }
