interface RawTrack {
  id: string;
  url: string;
  title: string;
  cover: string;
  artists: string[];
  genres: string[];
}

interface Genre {
  id: string;
  name: string;
  cover: string;
}

interface Artist {
  id: string;
  name: string;
  cover: string;
}

interface MediaResponse {
  default_cover: string;
  tracks: {
    [id: string]: RawTrack;
  };
  genres: {
    [id: string]: Genre;
  };
  artists: {
    [id: string]: Artist;
  };
}

interface FakeProcess {
  env: {
    NODE_ENV: string;
    APP_REVISION: string | undefined;
  };
}

declare const process: FakeProcess;

declare module '*.png' {
    const url: string;
    export default url;
}

declare module '*.svg' {
    const url: string;
    export default url;
}


declare module 'excuses' {
    type Excuses = {
        developers: {
            getAll: () => void,
            getRandom: () => void,
        },
    };
    const excuses: Excuses;

    export default excuses;
}
