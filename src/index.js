/**
 * Application entrypoint
 */

import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import audio from './services/audio';

const mountPoint = document.getElementById('main');

if (mountPoint) {
  audio.init().then(() => {
    ReactDOM.render(
      <App />,
      mountPoint,
    );
  }).catch(error => console.error(error));
} else {
  console.error('Mount point not found!');
}
