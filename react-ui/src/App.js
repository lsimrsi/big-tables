import React from 'react';
import './App.css';
import GridNoAnim from './components/GridNoAnim';
import GridAnim from './components/GridAnim';
import TableAnim from './components/TableAnim';
import StickyTable from './components/StickyTable';
import WindowTable from './components/WindowTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      {/* <GridNoAnim /> */}
      {/* <GridAnim /> */}
      {/* <TableAnim /> */}
      {/* <StickyTable /> */}
      <WindowTable />
    </div>
  );
}

export default App;
