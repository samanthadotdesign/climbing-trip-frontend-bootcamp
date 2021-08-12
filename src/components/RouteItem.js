import React from 'react';

export default function RouteItem({ name, difficulty }) {
  return (
    <div>
      <p>
        Route Name:
        {name}
      </p>
      <p>
        Route Difficulty:
        {difficulty}
      </p>
    </div>
  );
}
