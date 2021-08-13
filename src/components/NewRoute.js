import React, { useState, useContext } from 'react';
import { addRoute, RouteContext } from '../store';

export default function NewRoute() {
  const { dispatch } = useContext(RouteContext);
  const [currentRoute, setCurrentRoute] = useState();

  // Remembers changes when input field is active
  // Gives access to the component for the input value
  const handleChange = (e) => {
    const currentInput = e.target.value;
    setCurrentRoute(currentInput);
  };

  const handleAddClick = () => {
    // Send the route details to the database
    // That will change the state for store
    // getRoutes -> can dispatch to just add this new row
    addRoute(dispatch, currentRoute);
    setCurrentRoute('');
  };

  return (
    <>
      <input onChange={handleChange} type="text" placeholder="Route Name" value={currentRoute} />
      <button onClick={handleAddClick}>Add Route</button>
    </>
  );
}
