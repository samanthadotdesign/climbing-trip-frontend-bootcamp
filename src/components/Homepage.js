import React, { useContext, useEffect } from 'react';
import { getRoutes, RouteContext } from '../store';

export default function Homepage() {
  const { store, dispatch } = useContext(RouteContext);

  /* If I have existing routes, load them here using useEffect */
  useEffect(() => {
    getRoutes(dispatch);
  }, []);

  return (
    <div>
      <h1>Krabi</h1>
      <h3>Routes</h3>
      <NewRoute />
    </div>
  );
}
