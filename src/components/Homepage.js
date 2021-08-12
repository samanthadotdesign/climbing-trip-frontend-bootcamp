import React, { useContext, useEffect } from 'react';
import { getRoutes, RouteContext } from '../store';
import NewRoute from './NewRoute';
import RouteItem from './RouteItem';

export default function Homepage() {
  const { store, dispatch } = useContext(RouteContext);
  const { routes } = store;
  console.log(routes);
  /* If I have existing routes, load them here using useEffect */
  useEffect(() => {
    getRoutes(dispatch);
  }, []);

  return (
    <div>
      <h1>Krabi</h1>
      <h3>Routes</h3>
      {routes.map((route) => (
        <RouteItem name={route.name} difficulty={route.difficulty} />
      ))}
      <NewRoute />
    </div>
  );
}
