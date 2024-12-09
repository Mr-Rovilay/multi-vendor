// components/ProtectedRoute.js
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;