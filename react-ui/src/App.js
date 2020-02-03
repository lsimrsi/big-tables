import React from 'react';
import './App.css';
import GridNoAnim from './components/GridNoAnim';
import GridAnim from './components/GridAnim';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <GridNoAnim />
      <GridAnim />
    </div>
  );
}

export default App;
