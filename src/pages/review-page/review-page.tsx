import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ReviewForm from '../../components/review-form/review-form';

type ReviewPageProps = {
  title: string;
  imgLink: string;
  filmId: number;
}

export default function ReviewPage(props: ReviewPageProps): JSX.Element {
  return (
    <section className="film-card film-card--full">
      <Helmet><title>Review</title></Helmet>

      <div className="film-card__header">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt={props.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to='/' className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${props.filmId}`} className="breadcrumbs__link">{props.title}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={props.imgLink} alt={`${props.title} poster`} width="218" height="327" />
        </div>
      </div>

      <ReviewForm />

    </section>
  );
}
