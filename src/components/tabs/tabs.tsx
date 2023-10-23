import { useState } from 'react';
import { Link } from 'react-router-dom';
import OverviewTab from './overview-tab';
import DetailsTab from './details-tab';
import ReviewsTab from './reviews-tab';
import { Movie } from '../../types/movies';
import cn from 'classnames';
import { ReviewBase } from '../../types/reviews';

enum TabNames {
  Overview = 1,
  Details = 2,
  Reviews = 3
}

type TabsProps = {
  movie: Movie;
  reviews: ReviewBase[];
}

export default function Tabs({ movie, reviews }: TabsProps) {
  const [activeTab, setActiveTab] = useState(1);

  function handleClick(tabName: number) {
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
            className={cn('film-nav__item', { 'film-nav__item--active': activeTab === TabNames.Overview })}
            onClick={() => handleClick(TabNames.Overview)}
          >
            <Link to="#" className="film-nav__link">Overview</Link>
          </li>
          <li
            className={cn('film-nav__item', { 'film-nav__item--active': activeTab === TabNames.Details })}
            onClick={() => handleClick(TabNames.Details)}
          >
            <Link to="#" className="film-nav__link">Details</Link>
          </li>
          <li
            className={cn('film-nav__item', { 'film-nav__item--active': activeTab === TabNames.Reviews })}
            onClick={() => handleClick(TabNames.Reviews)}
          >
            <Link to="#" className="film-nav__link">Reviews</Link>
          </li>
        </ul>
      </nav>

      {getActiveTab()}
    </div>
  );
}
