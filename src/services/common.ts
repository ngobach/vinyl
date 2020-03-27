export type Cover = string;

export class Track {
  public url: string;
  public title: string;
  public genres: Genre[];
  public cover: Cover;
  public artists: Artist[];
}

export class Genre {
  public title: string;
  public cover: Cover;
  public tracks: Track[] = [];

  constructor (title: string) {
    this.title = title;
  }
}

export class Artist {
  public title: string;
  public cover: Cover;
  public tracks: Track[] = [];

  constructor (title: string) {
    this.title = title;
  }
}

