import React, { useState, useContext } from 'react';
import { RouteContext, updateRoute } from '../store';

// We use index to update in the front end
// id -> to help use use findByPk in the backend
export const RouteItem = ({
  index, id, name, difficulty,
}) => {
  const [difficultyInput, setDifficultyInput] = useState(difficulty);
  const { dispatch } = useContext(RouteContext);

  // If I change the value, the button has access
  // reflects in the UI
  const handleInputChange = (e) => {
    const newInput = e.target.value;
    setDifficultyInput(newInput);
  };

  const handleButtonClick = () => {
    updateRoute(dispatch, index, id, difficultyInput);
  };

  return (
    <div>
      <p>
        Route Name:
        {name}
      </p>
      <p>
        Route Difficulty:
        <input onChange={handleInputChange} type="text" value={difficultyInput} />
        <button onClick={handleButtonClick}>Save Difficulty</button>
      </p>
      <hr />
    </div>
  );
};
