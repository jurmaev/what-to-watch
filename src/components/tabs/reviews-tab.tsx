import { ReviewBase } from '../../types/reviews';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'Nobember',
  'December',
];

type ReviewsTabProps = {
  reviews: ReviewBase[];
};

export default function ReviewsTab({ reviews }: ReviewsTabProps) {
  function getDateWithDashes(dateString: string) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  function getDateWithComma(dateString: string) {
    const date = new Date(dateString);
    return `${
      MONTHS[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{review.user}</cite>
                <time
                  className="review__date"
                  dateTime={getDateWithDashes(review.date)}
                >
                  {getDateWithComma(review.date)}
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">{review.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
