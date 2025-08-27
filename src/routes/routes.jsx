import { HomeRedirect } from '@/utils';
import {
  Login,
  NotFound,
  Dashboard,
  ComingSoon,
  Layout,
  Unauthorized,
} from '@/views';

export const routes = [
  // Public routes
  { path: '/login', element: <Login /> },

  // Protected user routes
  {
    element: <Layout />, // wraps sidebar/header
    children: [
      // General Routes
      { path: '/', element: <HomeRedirect /> },
      { path: '/dashboard', element: <Dashboard />, roles: ['admin'] },
      { path: '/unauthorized', element: <Unauthorized /> },
      { path: '/coming-soon', element: <ComingSoon /> },

      // Flight Configuration Routes
      {
        path: '/test',
        children: [
          {
            path: 'flight-opening',
            children: [
              { path: 'one', element: <ComingSoon />, roles: ['admin'] },
              { path: ':id', element: <ComingSoon />, roles: ['admin'] },
            ],
          }
        ],
      },

      // System Structure Routes
      {
        path: '/system-structure',
        children: [
          { path: 'class', element: <ComingSoon />, roles: ['user', 'admin'] },
          { path: 'functions', element: <ComingSoon />, roles: ['user', 'admin'] },
        ],
      },

      // 404 fallback
      { path: '*', element: <NotFound /> },
    ],
  },
];
