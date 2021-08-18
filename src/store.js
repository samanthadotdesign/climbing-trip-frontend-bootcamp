import React, { useReducer } from 'react';
import axios from 'axios';

export const ACTIONS = {
  GET_ROUTE: 'get-route',
  ADD_ROUTE: 'add-route',
  UPDATE_DIFFICULTY: 'update-difficulty',
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
    case ACTIONS.UPDATE_DIFFICULTY:
      const { updatedRoute, index } = action.payload;
      state.routes[index] = updatedRoute;
      return { ...state };
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

const updateRouteAction = (updatedRoute, index) => ({
  type: ACTIONS.UPDATE_DIFFICULTY,
  payload: {
    updatedRoute,
    index,
  },
});

export const RouteProvider = ({ children }) => {
  const [store, dispatch] = useReducer(routeReducer, initialState);

  return (
    <Provider value={{ store, dispatch }}>{children}</Provider>
  );
};

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

export const getRoutes = (dispatch) => axios.get(`${REACT_APP_BACKEND_URL}/routes`).then((result) => {
  console.log(result);
  dispatch(getRoutesAction(result.data.routes));
  // setDraggableList() after GET route is completed
  // Postgres doesn't guarantee get request in the same order
  // Sorting may be required
  return result.data.routes;
});

export const addRoute = (dispatch, currentRoute) => {
  axios.post(`${REACT_APP_BACKEND_URL}/routes`, { currentRoute }).then((result) => {
    dispatch(addRouteAction(result.data));
  });
};

export const updateRoute = (dispatch, index, id, difficultyInput) => {
  axios.post(`${REACT_APP_BACKEND_URL}/update`, { id, difficultyInput }).then((result) => {
    dispatch(updateRouteAction(result.data));
  });
};
