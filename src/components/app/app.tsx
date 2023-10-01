import Main from '../../pages/main/main';
import { MainPageProps } from '../../pages/main/main';

export default function App(props: MainPageProps): JSX.Element {
  return (
    <Main filmName={props.filmName} genre={props.genre} date={props.date} />
  );
}
