import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import audio from '@/services/audioengine';
import App from '@/components/App';
import loadAssets from '@/services/assetloader';

const webfontConfig = {
  google: {
    families: ['Inter:200,400,900'],
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
    console.error(error);
  }
})();
