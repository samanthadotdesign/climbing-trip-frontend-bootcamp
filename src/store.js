import React, { useReducer } from 'react';
import axios from 'axios';

export const ACTIONS = {
  GET_ROUTE: 'get-route',
  ADD_ROUTE: 'add-route',
  ADD_DIFFICULTY: 'add-difficulty',
  REORDER_ROUTE: 'reorder-route',
};

// Initial state
const initialState = {
  routes: [],
};

export const RouteContext = React.createContext(null);

const routeReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.GET_ROUTE:
      // action.payload is an array so we need to also spread it to add to the new array
      return { ...state, routes: [...state.routes, ...action.payload] };
    case ACTIONS.ADD_ROUTE:
      return { ...state, routes: [...state.routes, action.payload] };
    default:
      return state;
  }
};

const { Provider } = RouteContext;

const getRoutesAction = (routes) => ({
  type: ACTIONS.GET_ROUTE,
  payload: routes,
});

const addRouteAction = (newRoute) => ({
  type: ACTIONS.ADD_ROUTE,
  payload: newRoute,
});

export const RouteProvider = ({ children }) => {
  const [store, dispatch] = useReducer(routeReducer, initialState);

  return (
    <Provider value={{ store, dispatch }}>{children}</Provider>
  );
};

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

export const getRoutes = (dispatch) => {
  axios.get(`${REACT_APP_BACKEND_URL}/routes`).then((result) => {
    dispatch(getRoutesAction(result.data.routes));
  });
};

export const addRoute = (dispatch, currentRoute) => {
  axios.post(`${REACT_APP_BACKEND_URL}/routes`, { currentRoute }).then((result) => {
    dispatch(addRouteAction(result.data));
    console.log(result.data);
    // result.data = { name: ... , tripId: ... }
  });
};
