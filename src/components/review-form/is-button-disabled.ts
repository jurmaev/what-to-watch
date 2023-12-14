export function isButtonDisabled(form: { rating: string; reviewText: string }) {
  if (
    form.rating === '0' ||
    form.reviewText.length < 50 ||
    form.reviewText.length > 400
  ) {
    return true;
  }
  return false;
}
