import { useUserStore } from '@/stores';
import { Navigate } from 'react-router-dom';

export const HomeRedirect = () => {
  const user = useUserStore((state) => state.user);

  if (!user) return <Navigate to="/login" replace />;

  // Example: redirect based on role
  if (user.role === 'admin') return <Navigate to="/dashboard" replace />;
  if (user.role === 'user') return <Navigate to="/load/domestic" replace />;

  // fallback
  return <Navigate to="/unauthorized" replace />;
};
