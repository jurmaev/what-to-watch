export type MovieBase = {
  id: string;
  name: string;
  genre: string;
};

export type MoviePreview = MovieBase & {
  previewImage: string;
  previewVideoLink: string;
};

export type PromoMovie = MovieBase & {
  posterImage: string;
  backgroundImage: string;
  videoLink: string;
  released: number;
  isFavorite: boolean;
};

export type Movie = PromoMovie & {
  backgroundColor: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
};

export type Movies = Movie[];
export type MoviePreviews = MoviePreview[];
