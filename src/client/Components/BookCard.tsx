import React, { useContext } from 'react';
import { render } from 'react-dom';
import { BookContext } from '../Containers/MainDisplay';

export default function ResultsContainer() {
  const context = useContext(BookContext);

  const ISBN = '0316067938'
    return (
      <div>
        Title: 
        Author:
        ISBN:
        Picture:
       
          
          <a href={`https://www.abebooks.com/products/isbn/${ISBN}`} target='_blank'><button>ABE button</button></a>

      </div>
    );
  }
