import React from 'react';
import { createRoot } from 'react-dom/client';
import WebFont from 'webfontloader';
import App from '@/App';

const webfontConfig = {
  google: {
    families: ['Raleway:400,700', 'Nunito:400,700'],
  },
  custom: {
    families: ['iconmonstr-iconic-font'],
  },
};

function loadFonts() {
  return new Promise<void>((resolve, reject) => {
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

    const root = createRoot(mountPoint);
    root.render(<App />);
  } catch (error) {
    console.error(error);
  }
})();
