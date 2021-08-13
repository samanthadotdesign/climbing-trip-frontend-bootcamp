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
        {/* Input field */}
      </p>
    </div>
  );
}
