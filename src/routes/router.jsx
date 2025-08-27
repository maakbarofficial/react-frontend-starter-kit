import { ProtectedRoute } from '@/utils';
import { Route } from 'react-router-dom';

export function router(routes, user) {
  return routes.map((route) => {
    const { path, element, roles, children } = route;

    if (children) {
      return (
        <Route
          key={path || Math.random()}
          path={path}
          element={roles ? <ProtectedRoute user={user} roles={roles} /> : element}
        >
          {router(children, user)}
        </Route>
      );
    }

    return roles ? (
      <Route key={path} path={path} element={<ProtectedRoute user={user} roles={roles} />}>
        <Route index element={element} />
      </Route>
    ) : (
      <Route key={path} path={path} element={element} />
    );
  });
}
