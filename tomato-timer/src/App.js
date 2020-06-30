import React, { useState } from 'react';
import './App.css';
import Timer from './Timer/index'

function App() {
  const [run, setRun] = useState(false);

  const handleClick = () => {
    setRun((r)=>!r);
  }

  const handleTimeout = () => {
    console.log('时间到')
    setRun((r)=>!r);
  }

  return (
    <div className="App">
      <Timer run={run} onTimeout={handleTimeout} />
      <div className="main-button" onClick={handleClick}>{
        run
          ? '休息一下'
          : '开始工作'
      }</div>
    </div>
  );
}

export default App;
