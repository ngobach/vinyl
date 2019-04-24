/**
 * Application entrypoint
 */

import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import App from './components/App';
import loadAssets from './services/asset-loader';
import audio from './services/audio';

const webfontConfig = {
  google: {
    families: ['Pacifico', 'Saira Condensed:100,400,700:vietnamese'],
  },
  custom: {
    families: ['iconmonstr-iconic-font'],
    urls: ['https://cdn.iconmonstr.com/1.3.0/css/iconmonstr-iconic-font.min.css'],
  },
};

function loadFonts() {
  return new Promise((resolve, reject) => {
    WebFont.load({
      ...webfontConfig,
      active: resolve(),
      inactive: reject(),
    });
  });
}

(async () => {
  try {
    const mountPoint = document.getElementById('main');
    if (!mountPoint) {
      throw new Error('Mount point not found!');
    }
    await Promise.all([
      await audio.init(),
      await loadAssets(),
      await loadFonts(),
    ]);
    ReactDOM.render(
      <App />,
      mountPoint,
    );
  } catch (error) {
    console.error('Encountered error while attempting to bootstrap vinyl');
    console.error(error);
  }
})();
