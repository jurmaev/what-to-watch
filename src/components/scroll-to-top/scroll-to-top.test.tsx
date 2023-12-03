import { render } from '@testing-library/react';
import ScrollToTop from './scroll-to-top';
import { withHistory } from '../../services/mocks';
import { createMemoryHistory } from 'history';
import { AppRoutes } from '../../const';
import { act } from 'react-dom/test-utils';

describe('ScrollToTop', () => {
  it('scrolls to top', () => {
    window.scrollTo = vi.fn();
    const mockHistory = createMemoryHistory();

    render(withHistory(<ScrollToTop />, mockHistory));
    act(() => {
      mockHistory.push(AppRoutes.Login);
    });

    expect(window.scrollTo).toBeCalledTimes(2);
  });
});
