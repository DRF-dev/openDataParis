// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';

import './index.scss';

import Body from './components/body';

const App = () => (
  <Body />
);

ReactDOM.render(<App />, document.getElementById('app'));
