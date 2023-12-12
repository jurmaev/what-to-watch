import { Reviews } from '../../types/reviews';

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
  reviews: Reviews;
};

function getDateWithDashes(dateString: string) {
  const date = new Date(dateString);
  return `${date.getUTCFullYear()}-${
    date.getUTCMonth() + 1
  }-${date.getUTCDate()}`;
}

function getDateWithComma(dateString: string) {
  const date = new Date(dateString);
  return `${
    MONTHS[date.getUTCMonth()]
  } ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

export default function ReviewsTab({ reviews }: ReviewsTabProps) {
  function sliceReviews(start: number, end?: number) {
    return reviews.slice(start, end).map((review) => (
      <div key={review.id} className="review" data-testid="review">
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
    ));
  }

  return (
    <div className="film-card__reviews film-card__row">
      {reviews.length > 1 ? (
        <>
          <div className="film-card__reviews-col">
            {sliceReviews(0, Math.ceil(reviews.length / 2))}
          </div>
          <div className="film-card__reviews-col">
            {sliceReviews(Math.ceil(reviews.length / 2))}
          </div>
        </>
      ) : (
        <div className="film-card__reviews-col">
          {sliceReviews(0, reviews.length)}
        </div>
      )}
    </div>
  );
}
