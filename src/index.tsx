import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import App from '~/App';

const webfontConfig = {
  google: {
    families: ['Raleway:400,700', 'Nunito:400,700'],
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
      active: resolve,
      inactive: reject,
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
      await loadFonts(),
      // TODO: more come here
    ]);

    ReactDOM.render(
      <App />,
      mountPoint,
    );
  } catch (error) {
    console.error(error);
  }
})();
