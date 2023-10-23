export type Review = {
  id: string;
  comment: string;
  date: Date;
  rating: number;
  user: string;
}

export type Reviews = Review[];
