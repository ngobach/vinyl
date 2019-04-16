/**
 * Application entrypoint
 */

import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import loadAssets from './services/asset-loader';
import audio from './services/audio';

(async () => {
  try {
    const mountPoint = document.getElementById('main');
    if (!mountPoint) {
      throw new Error('Mount point not found!');
    }
    await audio.init();
    await loadAssets();
    ReactDOM.render(
      <App />,
      mountPoint,
    );
  } catch (error) {
    console.error('Encountered error while attempting to bootstrap vinyl');
    console.error(error);
  }
})();
