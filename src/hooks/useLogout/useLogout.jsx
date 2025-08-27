import { useAuthStore, useUserStore } from '@/stores';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const { setUser } = useUserStore();
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  return () => {
    setUser(null);
    setToken(null);
    navigate('/login');
  };
};

export default useLogout;
