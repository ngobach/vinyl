// TODO: Remove this file

interface FileList {
  [key: string]: string;
}

interface LoadedList {
  [key: string]: any;
}

const fileList: FileList = {};
const loaded: LoadedList = {};

async function loadImage(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

function getLoadedAssert(): LoadedList {
  return loaded;
}

async function load() {
  if (Object.keys(loaded).length !== Object.keys(fileList).length) {
    await Promise.all(Object.entries(fileList).map(async ([name, value]) => {
      loaded[name] = await loadImage(value);
    }));

    console.log('Assets loaded');
  }

  return loaded;
}

export default load;
export { getLoadedAssert };
