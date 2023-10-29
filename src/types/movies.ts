export type MovieBase = {
  id: string;
  name: string;
  genre: string;
};

export type MoviePreview = MovieBase & {
  previewImage: string;
  previewVideoLink: string;
};

export type Movie = MovieBase & {
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  released: number;
  isFavorite: boolean;
};

export type Movies = Movie[];
export type MoviePreviews = MoviePreview[];
