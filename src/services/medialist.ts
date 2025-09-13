import { memoize } from 'lodash';
import { ofetch } from 'ofetch';
import { MEDIA_SOURCE } from '@/env';
import { PlayList, Track } from '@/types';
import { log } from '@/utils';
import { hasProtocol, joinURL } from 'ufo';

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

const getBaseUrl = (): string => {
  const mediaSourceUrl = new URL(MEDIA_SOURCE, window.location.href);

  return mediaSourceUrl.toString();
};

const baseURL = getBaseUrl();

export const resolveMediaUrl = (urlOrPath: string): string => {
  return hasProtocol(urlOrPath) ? urlOrPath : joinURL(baseURL, urlOrPath);
};

const fetch = ofetch.create({
  baseURL,
});

const MediaList: MediaList = {
  tracks: [],
  defaultCover: '',
  all: null!,

  async ensureFetched(): Promise<MediaList> {
    try {
      const mediaIndex = await fetch<API.Response>('index.json');
      log('📩 %cResponse received', 'font-weight: bold');

      this.tracks = mediaIndex.tracks.map<Track>((raw) => ({
        title: raw.title,
        coverUrl: resolveMediaUrl(raw.cover ?? this.defaultCover),
        artist: raw.artist,
        url: resolveMediaUrl(raw.url ?? this.defaultCover),
      }));

      this.all = {
        title: 'Everything',
        coverUrl: this.defaultCover,
        tracks: this.tracks,
      };
    } catch (error) {
      log(
        `😱%cCannot fetch media playlists: ${(error as Error).message}`,
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
