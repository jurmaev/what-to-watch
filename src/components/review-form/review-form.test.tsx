import { render, screen } from '@testing-library/react';
import ReviewForm from './review-form';
import { extractActionTypes, withStore } from '../../services/mocks';
import userEvent from '@testing-library/user-event';
import { ApiRoute } from '../../const';
import { postReview } from '../../store/api-actions';

describe('ReviewForm', () => {
  it('renders correctly', () => {
    const { withStoreComponent } = withStore(<ReviewForm id="1" />);

    render(withStoreComponent);

    expect(screen.getAllByTestId('rating')).toHaveLength(10);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('checks rating on click', async () => {
    const { withStoreComponent } = withStore(<ReviewForm id="1" />);

    render(withStoreComponent);
    await userEvent.click(screen.getAllByTestId('rating')[4]);

    expect(screen.getAllByTestId('rating')[4]).toBeChecked();
  });

  it('types text in textarea', async () => {
    const { withStoreComponent } = withStore(<ReviewForm id="1" />);
    const expectedText = 'good movie';

    render(withStoreComponent);
    await userEvent.type(
      screen.getByPlaceholderText('Review text'),
      expectedText
    );

    expect(screen.getByDisplayValue(expectedText)).toBeInTheDocument();
  });

  it('sends review on submit click', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <ReviewForm id="1" />
    );

    render(withStoreComponent);
    mockAxiosAdapter.onPost(`${ApiRoute.Reviews}/1`).reply(200);
    await userEvent.click(screen.getAllByTestId('rating')[4]);
    await userEvent.type(screen.getByPlaceholderText('Review text'), 'review');
    await userEvent.click(screen.getByRole('button'));

    const actions = extractActionTypes(mockStore.getActions());

    expect(actions).toEqual([
      postReview.pending.type,
      postReview.fulfilled.type,
    ]);
  });
});
