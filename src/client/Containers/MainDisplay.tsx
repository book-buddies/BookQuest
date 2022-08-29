import React, { useState } from 'react';
import { render } from 'react-dom';
import ResultsContainer from './ResultsContainer'
import NavBar from './NavBar'

export default function MainDisplay() {

const [query, setQuery] = useState('')

    function updateResults(){
      console.log('hi');
      setQuery('hi');
    }
    return (
      <>
        <NavBar/>
        <ResultsContainer/>
      </>
    );
  }

