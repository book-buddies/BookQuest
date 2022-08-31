import React, { useContext } from 'react';
import { render } from 'react-dom';

import { BookContext } from '../Containers/MainDisplay.jsx';


export default function ResultsContainer({info}) {

  // const ISBN = '0316067938'
    return (
      <div>
        Title: {info.title}
        Author: {info.author}
        ISBN: {info.isbn}
          <a href={`https://www.biblio.com/${info.isbn}`} target='_blank'><button>Biblio button</button></a>
      </div>
    );
  }
