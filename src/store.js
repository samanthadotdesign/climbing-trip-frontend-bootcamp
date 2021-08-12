import React from 'react';

export const ACTIONS = {
  ADD_ROUTE: 'add-route',
  ADD_DIFFICULTY: 'add-difficulty',
  REORDER_ROUTE: 'reorder-route',
};

// Initial state
const state = {
  routes: [],
};

export const RouteContext = React.createContext(null);

const routeReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ROUTE:
      return;
    default:
      return state;
  }
};

const { Provider } = RouteContext;

export const RouteProvider = ({ children }) => {
  const [store, dispatch] = useReducer(routeReducer, state);

  return (
    <Provider value={{ store, dispatch }}>{children}</Provider>
  );
};
