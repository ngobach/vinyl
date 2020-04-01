/* tslint:disable:max-classes-per-file */

export type Cover = string;

export class Track {
  public url: string;
  public title: string;
  public genres: Genre[] = [];
  public cover: Cover;
  public artists: Artist[] = [];
}

export interface PlayList {
  tracks: Track[];
  title: string;
  cover: string;
}

export class GenericList implements PlayList {
  constructor(
    public title: string,
    public tracks: Track[],
    public cover: string,
  ) {}
}

export class Genre implements PlayList {
  public title: string;
  public cover: Cover;
  public tracks: Track[] = [];

  constructor (title: string) {
    this.title = title;
  }
}

export class Artist implements PlayList {
  public title: string;
  public cover: Cover;
  public tracks: Track[] = [];

  constructor (title: string) {
    this.title = title;
  }
}

export class SearchResult implements PlayList {
  constructor(
    public title: string,
    public tracks: Track[],
  ) {}
}
