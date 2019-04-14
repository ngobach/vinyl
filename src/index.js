/**
 * Application entrypoint
 */

import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const mountPoint = document.getElementById('main');

if (mountPoint) {
  ReactDOM.render(
    <App />,
    mountPoint,
  );
} else {
  console.error('Mount point not found!');
}
