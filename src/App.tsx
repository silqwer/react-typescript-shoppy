import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

const App = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default App;
