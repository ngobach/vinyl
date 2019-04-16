/* eslint-disable global-require */
const fileList = {
  icon_audio_3: require('../assets/icons8-audio-100.png'),
  icon_audio_3_filled: require('../assets/icons8-audio-filled-100.png'),
  icon_audio_2: require('../assets/icons8-voice-100.png'),
  icon_audio_2_filled: require('../assets/icons8-voice-filled-100.png'),
  icon_audio_1: require('../assets/icons8-low-volume-100.png'),
  icon_audio_1_filled: require('../assets/icons8-low-volume-filled-100.png'),
  icon_audio_0: require('../assets/icons8-mute-100.png'),
  icon_audio_0_filled: require('../assets/icons8-mute-filled-100.png'),
  icon_pause: require('../assets/icons8-pause-100.png'),
  icon_pause_filled: require('../assets/icons8-pause-filled-100.png'),
  icon_play: require('../assets/icons8-play-100.png'),
  icon_play_filled: require('../assets/icons8-play-filled-100.png'),
  icon_repeat: require('../assets/icons8-repeat-one-100.png'),
  icon_repeat_filled: require('../assets/icons8-repeat-one-filled-100.png'),
  icon_shuffle: require('../assets/icons8-shuffle-100.png'),
  icon_shuffle_filled: require('../assets/icons8-shuffle-filled-100.png'),
  icon_next: require('../assets/icons8-end-100.png'),
  icon_next_filled: require('../assets/icons8-end-filled-100.png'),
  bg_image: 'https://images.unsplash.com/photo-1490023859957-aaf2fcc67fd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80',
};
/* eslint-enable global-require */

const loaded = {};

function loadImage(url) {
  const node = new Image();
  node.src = url;
  return new Promise((resolve, reject) => {
    node.onload = () => resolve(url);
    node.onerror = err => reject(err);
  });
}

function getLoadedAssert() {
  return loaded;
}

async function load() {
  if (Object.keys(loaded).length !== fileList) {
    await Object.entries(fileList).map(async ([name, value]) => {
      loaded[name] = await loadImage(value);
    });

    console.log('Assets loaded');
  }

  return loaded;
}

export default load;
export { getLoadedAssert };
