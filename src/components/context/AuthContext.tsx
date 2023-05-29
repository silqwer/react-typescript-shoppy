import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../../api/firebase';
import { type ShoppyUser } from '../../types/User';

interface AuthContextProps {
  user: ShoppyUser | undefined;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  login,
  logout
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<undefined | ShoppyUser>(undefined);

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextProps => {
  return useContext(AuthContext);
};
