import { useDocumentTitle } from '@/hooks';
import { Link } from 'react-router-dom';

const NotFound = () => {
  useDocumentTitle('Not Found');
  return (
    <div className="h-full content-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-secondary">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Not Found.</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Whoops! The page you are trying to visit doesn’t exist.
          </p>
          <Link to={'/'} className="button-primary">
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
