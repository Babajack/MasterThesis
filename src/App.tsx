import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskView from './views/TaskView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TaskView />
      </header>
    </div>
  );
}

export default App;
