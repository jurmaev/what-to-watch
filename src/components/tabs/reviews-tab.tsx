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

function getDateWithDashes(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function getDateWithComma(dateString: string) {
  const date = new Date(dateString);
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export default function ReviewsTab({ reviews }: ReviewsTabProps) {
  function sliceReviews(start: number, end: number) {
    return reviews.slice(start, end).map((review) => (
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
    ));
  }

  return (
    <div className="film-card__reviews film-card__row">
      {reviews.length > 1 ? (
        <>
          <div className="film-card__reviews-col">
            {sliceReviews(0, reviews.length / 2 + 1)}
          </div>
          <div className="film-card__reviews-col">
            {sliceReviews(reviews.length / 2 + 1, reviews.length)}
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
