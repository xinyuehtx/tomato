import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import Timer from './Timer/index';
import Setting from './Setting/index';
import * as runStates from './constants';
import SettingContext from './context';


const reducer = (state, action) => {
  switch (action.type) {
    case 'set': return action.count;
    default: throw new Error('Unexpected action');
  }
}


function App() {
  const [run, setRun] = useState(runStates.INIT);
  const [inWork, setInWork] = useState(true);
  const [initTime, setInitTime] = useState(1);
  const [workTime, workTimeDispatch] = useReducer(reducer, 25);
  const [restTime, restTimeDispatch] = useReducer(reducer, 5);
  const [showSetting, setShowSetting] = useState(false);


  useEffect(() => {
    if (run === runStates.INIT) {
      inWork ? setInitTime(workTime) : setInitTime(restTime);
    }
  }, [run, inWork, workTime, restTime]);

  const handleClick = () => {
    setRun((r) => {
      if (r === runStates.RUNNING) {
        return runStates.PAUSE;
      }
      else {
        return runStates.RUNNING;
      }
    });
  }

  const handleRestClick = () => {
    debugger;
    if (run === runStates.INIT) {
      setRun(runStates.RUNNING);
    }
    else {
      setRun(runStates.INIT);
      setInWork((work) => !work);
    }
  }

  const handleTimeout = () => {
    setRun(runStates.INIT);
    const newWorkState = !inWork
    setInWork(newWorkState);
    if (newWorkState) {
      alert('休息时间结束');
    }
    else {
      alert('工作时间结束');
    }
  }

  const handleSettingButtonClick = () => {
    if (showSetting) {
      setShowSetting(false);
    }
    else {
      setShowSetting(true);
      setRun(runStates.INIT);
    }
  }


  return (
    <SettingContext.Provider value={{ workTime, workTimeDispatch, restTime, restTimeDispatch }}>
      <div className="App">
        {
          showSetting
            ? <Setting />
            : <>
              <Timer run={run} initTime={initTime} onTimeout={handleTimeout} />
              {
                inWork
                  ? <div className="main-button" onClick={handleClick}>{
                    run === runStates.INIT
                      ? '开始工作'
                      : run === runStates.RUNNING
                        ? '休息一下'
                        : '继续工作'
                  }</div>
                  : <div className="main-button" onClick={handleRestClick}>{
                    run === runStates.INIT
                      ? '开始休息'
                      : '结束休息'
                  }</div>
              }
            </>
        }

        <div className="setting-button" onClick={handleSettingButtonClick}>
          {
            showSetting
              ? '完成设置'
              : '设置时间'
          }
        </div>
      </div>
    </SettingContext.Provider>
  );
}

export default App;
