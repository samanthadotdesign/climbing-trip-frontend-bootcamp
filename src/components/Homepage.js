import React from 'react';

export default function Homepage() {
  return (
    <div>
      <h1>Krabi</h1>
      <h3>Routes</h3>
      {/* If I have existing routes, load them here using useEffect */}
      <NewRoute />
    </div>
  );
}
