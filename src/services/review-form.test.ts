import { isButtonDisabled } from './review-form';

const correctReview =
  'review text with at least 50 symbols to pass length check';

describe.each([
  { form: { rating: '0', reviewText: correctReview }, expected: true },
  { form: { rating: '1', reviewText: 'review' }, expected: true },
  { form: { rating: '5', reviewText: correctReview }, expected: false },
])('isButtonDisabled', ({ form, expected }) => {
  it('disables button correctly', () => {
    const result = isButtonDisabled(form);

    expect(result).toBe(expected);
  });
});
