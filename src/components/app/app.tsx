import MainPage from '../../pages/main-page/main-page';
import { MainPageProps } from '../../pages/main-page/main-page';

type AppProps = {
  cardsCount: number;
}

export default function App(props: MainPageProps & AppProps): JSX.Element {
  return (
    <MainPage filmName={props.filmName} genre={props.genre} date={props.date} cardsCount={props.cardsCount} />
  );
}
