/* eslint-disable global-require */
const fileList = {
};
/* eslint-enable global-require */

const loaded = {};

async function loadImage(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

function getLoadedAssert() {
  return loaded;
}

async function load() {
  if (Object.keys(loaded).length !== fileList) {
    await Promise.all(Object.entries(fileList).map(async ([name, value]) => {
      loaded[name] = await loadImage(value);
    }));

    console.log('Assets loaded');
  }

  return loaded;
}

export default load;
export { getLoadedAssert };
