import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './components/context/AuthContext';
import NavBar from './components/NavBar';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <NavBar />
        <Outlet />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;
