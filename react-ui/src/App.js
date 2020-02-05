import React from 'react';
import 'normalize.min.css';
import './App.css';
import GridNoAnim from './components/GridNoAnim';
import GridAnim from './components/GridAnim';
import TableAnim from './components/TableAnim';
import StickyTable from './components/StickyTable';
import WindowTable from './components/WindowTable';
import CustomTable from './components/CustomTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      {/* <GridNoAnim /> */}
      {/* <GridAnim /> */}
      {/* <TableAnim /> */}
      {/* <StickyTable /> */}
      {/* <WindowTable /> */}
      <CustomTable />
    </div>
  );
}

export default App;
