import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../components/context/AuthContext';

interface Props {
  children: JSX.Element;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({ children, requireAdmin }) => {
  const { user } = useAuthContext();
  if (user === undefined || (requireAdmin !== undefined && !user.isAdmin)) {
    return <Navigate to='/' replace />;
  }
  return children;
};

export default ProtectedRoute;
