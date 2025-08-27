import LargeLogo from '@/assets/logo.png';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import ThemeToggler from '@/components/ThemeToggler/ThemeToggler';
import { useAuthStore, useUserStore } from '@/stores';
import { Loader } from '@/components';
import { LoginUser } from '@/api/apis';
import { HealthCheck } from '..';
import { useDocumentTitle } from '@/hooks';

const Login = () => {
  useDocumentTitle('Login');
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const { setToken } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      return toast.error('Please fill all fields');
    }

    try {
      setLoading(true);
      const data = await LoginUser(formData);
      setUser(data);
      setToken(data?.accessToken);
      navigate('/dashboard');
      toast.success(data?.message);
      setLoading(false);
    } catch (error) {
      console.error('error: ', error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="bg-[url('https://miro.medium.com/v2/resize:fit:1400/0*DZZjrKbTxFTssqRK.jpg')] fixed top-0 left-0 bg-fixed bg-cover bg-center w-full min-h-screen -z-20 flex content-center flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 overflow-y-auto">
        <div className="w-full relative z-10 bg-white/40 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-3 sm:p-8">
            <div>
              <img className="mx-auto w-48" src={LargeLogo} alt="Logo" />
            </div>
            <div className="flex flex-col items-center justify-between">
              <h1 className="font-bold text-lg uppercase">React Starter Kit</h1>
              <h1 className="primary-heading font-extrabold">Login</h1>
              <ThemeToggler />
              <p className="font-bold">Sign in to your account</p>
              <p className='text-xs'>username: emilys - pass: emilyspass</p>
            </div>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="username" className="label">
                  Username
                </label>
                <input
                  className="input"
                  type="text"
                  name="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button onClick={handleLogin} type="submit" className="button-primary w-full" disabled={loading}>
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>

      <HealthCheck />
    </div>
  );
};

export default Login;
