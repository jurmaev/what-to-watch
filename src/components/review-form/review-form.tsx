import { useState } from 'react';

export default function ReviewForm() {
  const [form, setForm] = useState({ rating: '0', reviewText: '' });
  const ratings = [...Array(10).keys()].map((_, i) => i + 1).reverse();

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            {ratings.map((rating) =>
              [<input key={`input-${rating}`} onChange={(evt) => setForm({ ...form, rating: evt.target.value })} className="rating__input" id={`star-${rating}`} type="radio" name="rating" value={rating} />,
                <label key={`label-${rating}`} className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>]
            )}
          </div>
        </div>

        <div className="add-review__text">
          <textarea value={form.reviewText} onChange={(evt) => setForm({ ...form, reviewText: evt.target.value })} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form >
    </div >
  );
}
