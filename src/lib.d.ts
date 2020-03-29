interface RawTrack {
  url: string;
  title: string;
  artist: string;
  cover: string;
  genres: string[];
}

type MediaResponse = RawTrack[];
