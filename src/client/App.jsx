import React from 'react';
import { render } from 'react-dom';

import {MainDisplay} from './Containers/MainDisplay.jsx'

import './style.scss'

const App = () => {
  return (
    <div>
      <h1>i like book</h1>
      <MainDisplay/>
    </div>
  );
}

render(<App />, document.querySelector('#root'));