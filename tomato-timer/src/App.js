import React from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from './Timer/index'

function App() {
  return (
    <div className="App">
      <Timer />
      <div className="main-button">开始工作</div>
    </div>
  );
}

export default App;
