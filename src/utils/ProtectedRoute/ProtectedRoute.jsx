import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ user, roles }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
