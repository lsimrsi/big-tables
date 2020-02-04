import React from 'react';
import './App.css';
import GridNoAnim from './components/GridNoAnim';
import GridAnim from './components/GridAnim';
import TableAnim from './components/TableAnim';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      {/* <GridNoAnim /> */}
      <GridAnim />
      <TableAnim />
    </div>
  );
}

export default App;
