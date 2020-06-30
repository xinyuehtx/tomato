import React from 'react';
import './App.css';
import Timer from './Timer/index'

function App() {
  return (
    <div className="App">
      <Timer className="timer"/>
      <div className="main-button">开始工作</div>
    </div>
  );
}

export default App;
