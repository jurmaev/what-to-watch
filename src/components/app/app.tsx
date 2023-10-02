import MainPage from '../../pages/main-page/main-page';
import { MainPageProps } from '../../pages/main-page/main-page';

export default function App(props: MainPageProps): JSX.Element {
  return (
    <MainPage filmName={props.filmName} genre={props.genre} date={props.date} />
  );
}
