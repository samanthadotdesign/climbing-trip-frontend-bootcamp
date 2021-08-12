import React from 'react';
import Homepage from './components/Homepage';
import { RouteProvider } from './store';

function App() {
  return (
    <RouteProvider>
      <Homepage />
    </RouteProvider>
  );
}

export default App;
