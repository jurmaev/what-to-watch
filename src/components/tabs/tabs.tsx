import { useState } from 'react';
import { Link } from 'react-router-dom';
import OverviewTab from './overview-tab';
import DetailsTab from './details-tab';
import ReviewsTab from './reviews-tab';
import { Movie } from '../../types/movies';
import cn from 'classnames';
import { Reviews } from '../../types/reviews';

const TabNames = {
  Overview: 'Overview',
  Details: 'Details',
  Reviews: 'Reviews',
} as const;

type TabsProps = {
  movie: Movie;
  reviews: Reviews;
};

export default function Tabs({ movie, reviews }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(TabNames.Overview);

  function handleClick(tabName: string) {
    setActiveTab(tabName);
  }

  function getActiveTab() {
    switch (activeTab) {
      case TabNames.Overview:
        return <OverviewTab movie={movie} />;
      case TabNames.Details:
        return <DetailsTab movie={movie} />;
      case TabNames.Reviews:
        return <ReviewsTab reviews={reviews} />;
    }
  }

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li
            className={cn('film-nav__item', {
              'film-nav__item--active': activeTab === TabNames.Overview,
            })}
            onClick={() => handleClick(TabNames.Overview)}
          >
            <Link to="#" className="film-nav__link">
              {TabNames.Overview}
            </Link>
          </li>
          <li
            className={cn('film-nav__item', {
              'film-nav__item--active': activeTab === TabNames.Details,
            })}
            onClick={() => handleClick(TabNames.Details)}
          >
            <Link to="#" className="film-nav__link">
              {TabNames.Details}
            </Link>
          </li>
          <li
            className={cn('film-nav__item', {
              'film-nav__item--active': activeTab === TabNames.Reviews,
            })}
            onClick={() => handleClick(TabNames.Reviews)}
          >
            <Link to="#" className="film-nav__link">
              {TabNames.Reviews}
            </Link>
          </li>
        </ul>
      </nav>

      {getActiveTab()}
    </div>
  );
}
