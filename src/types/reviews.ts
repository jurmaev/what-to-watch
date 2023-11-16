export type ReviewBase = {
  id: string;
  comment: string;
  rating: number;
}

export type Review = ReviewBase & {
  date: string;
  user: string;
};

export type Reviews = Review[];
