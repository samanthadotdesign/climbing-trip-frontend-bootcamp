import React from 'react';

export default function NewRoute() {
  const handleAddClick = () => {
    // Send the route details to the database
    // That will change the state for store
    console.log('add route');
  };

  return (
    <>
      <input type="text" placeholder="Route Name" />
      <button onClick={handleAddClick}>Add Route</button>
    </>
  );
}
