export type ReviewBase = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: string;
};

export type Review = {
  id: string;
  reviews: ReviewBase[];
};

export type Reviews = Review[];
