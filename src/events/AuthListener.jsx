import { useLogout } from '@/hooks';
import { useEffect } from 'react';

const AuthListener = () => {
  const logout = useLogout();

  useEffect(() => {
    const handleLogout = () => logout();
    window.addEventListener('logout', handleLogout);

    return () => {
      window.removeEventListener('logout', handleLogout);
    };
  }, [logout]);

  return null;
};

export default AuthListener;
