interface RawTrack {
  url: string;
  title: string;
  artist: string;
  cover: string;
  genre: string;
}

type MediaResponse = RawTrack[];
