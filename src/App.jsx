import { BrowserRouter, Routes } from 'react-router-dom';
import { useUserStore } from '@/stores';
import { routes } from '@/routes/routes';
import { ErrorBoundary } from '@/views';
import AuthListener from './events/AuthListener';
import { router } from '@/routes/router';

function App() {
  const user = useUserStore((state) => state.user);
  return (
    <BrowserRouter basename="/app">
      <AuthListener />
      <ErrorBoundary>
        <Routes>{router(routes, user)}</Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
