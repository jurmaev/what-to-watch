import { getRatingText } from './rating';

describe.each([
  { rating: 2.5, expectedMessage: 'Bad' },
  { rating: 4, expectedMessage: 'Normal' },
  { rating: 7, expectedMessage: 'Good' },
  { rating: 9, expectedMessage: 'Very good' },
  { rating: 10, expectedMessage: 'Awesome' },
])('getRatingtext', ({ rating, expectedMessage }) => {
  it('shows correct message', () => {
    const message = getRatingText(rating);

    expect(message).toBe(expectedMessage);
  });
});
