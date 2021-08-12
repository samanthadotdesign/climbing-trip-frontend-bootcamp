import React, { useReducer } from 'react';
import axios from 'axios';

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
      return { ...state, routes: [...state.routes, action.payload] };
    default:
      return state;
  }
};

const { Provider } = RouteContext;

const getRoutesAction = (routes) => ({
  type: ACTIONS.ADD_ROUTE,
  payload: routes,
});

export const RouteProvider = ({ children }) => {
  const [store, dispatch] = useReducer(routeReducer, state);

  return (
    <Provider value={{ store, dispatch }}>{children}</Provider>
  );
};

export const getRoutes = (dispatch) => {
  axios.get('/').then((result) => {
    dispatch(getRoutesAction(result.data));
  });
};
