import { memoize } from 'lodash';
import { MEDIA_SOURCE } from '@/env';
import { PlayList, Track } from '@/types';
import log from '@/utils/log';

function genUrlForFile(fileOrUrl: string, fallback = null): string {
  if (!fileOrUrl) {
    return fallback;
  }

  if (fileOrUrl.match(/https?:\/\//)) {
    return fileOrUrl;
  }

  return `${MEDIA_SOURCE.replace(/\/$/, '')}/${fileOrUrl.replace(/^\//, '')}`;
}

interface MediaList {
  tracks: Track[];
  all: PlayList;
  defaultCover: string;

  ensureFetched: () => Promise<MediaList>;
  search: (keyword: string) => Promise<PlayList>;
}

// eslint-disable-next-line
namespace API {
  export type Track = {
    url: string;
    title: string;
    cover: string;
    artist: string;
  };

  export type Response = {
    default_cover: string;
    tracks: Track[];
  };
}

const MediaList: MediaList = {
  tracks: [],
  defaultCover: '',
  all: null,

  async ensureFetched(): Promise<MediaList> {
    try {
      const mr: API.Response = await (
        await fetch(genUrlForFile('index.json'))
      ).json();

      log('📩 %cResponse received', 'font-weight: bold');

      this.tracks = mr.tracks.map<Track>((raw) => ({
        title: raw.title,
        coverUrl: genUrlForFile(raw.cover, mr.default_cover),
        artist: raw.artist,
        url: genUrlForFile(raw.url),
      }));

      this.all = {
        title: 'Everything',
        cover: this.defaultCover,
        tracks: this.tracks,
      };
    } catch (error) {
      log(
        `😱%cCannot fetch media playlists: ${error.message}`,
        'font-weight: bold',
      );
      throw error;
    }

    return this;
  },

  // eslint-disable-next-line
  async search(keyword: string): Promise<PlayList> {
    throw new Error('Unimplemented');
  },
};

MediaList.ensureFetched = memoize(MediaList.ensureFetched);

export default MediaList;
