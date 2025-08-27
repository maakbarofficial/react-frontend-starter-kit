import Alert from '@/ui/Alert/Alert';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold text-primary">Something went wrong.</h1>
      <p className="mt-2 text-lg text-red-600">
        {' '}
        <Alert message={error.message} />
      </p>
    </div>
  );
};

const ErrorBoundary = ({ children }) => {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>;
};

export default ErrorBoundary;
