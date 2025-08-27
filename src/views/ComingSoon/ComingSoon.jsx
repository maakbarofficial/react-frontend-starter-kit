import Logo from '@/assets/logo.png';
import { useDocumentTitle } from '@/hooks';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  useDocumentTitle('Coming Soon');
  return (
    <div className="h-full content-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-5xl tracking-tight font-extrabold lg:text-8xl text-secondary">
            <img src={Logo} alt="Logo" className="mx-auto w-52" />
            Coming Soon
          </h1>
          <div className="p-4 my-5 text-base text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
            <span className="font-extrabold">This module is under development!</span> <br /> Whoops! The page you are
            trying to visit is under development.
          </div>
          <Link to={'/'} className="button-primary">
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
