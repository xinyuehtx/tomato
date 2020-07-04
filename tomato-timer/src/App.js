import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import Timer from './Timer/index';
import Setting from './Setting/index';
import * as runStates from './constants';
import SettingContext from './context';
import Modal from './Modal';


const reducer = (state, action) => {
  switch (action.type) {
    case 'set': return action.count;
    default: throw new Error('Unexpected action');
  }
}

const timeReducer = (state, action) => {
  switch (action.type) {
    case 'set': return action.count;
    case 'minusOne': return state > 0 ? state - 1 : 0;
    default: throw new Error('Unexpected action');
  }
}


function App() {
  const [run, setRun] = useState(runStates.INIT);
  const [inWork, setInWork] = useState(true);
  const [workTime, workTimeDispatch] = useReducer(reducer, 25);
  const [restTime, restTimeDispatch] = useReducer(reducer, 5);
  const [remainTime, remainTimeDispatch] = useReducer(timeReducer, workTime);
  const [showSetting, setShowSetting] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);

  const resetTime = (inWork, workTime, restTime) => {
    inWork
      ? remainTimeDispatch({ type: 'set', count: workTime * 60 })
      : remainTimeDispatch({ type: 'set', count: restTime * 60 });
  };

  useEffect(() => {
    resetTime(inWork, workTime, restTime);
  }, [inWork, workTime, restTime]);

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
    if (run === runStates.INIT) {
      setRun(runStates.RUNNING);
    }
    else {
      setRun(runStates.INIT);
      setInWork((work) => !work);
    }
  }

  const handleTimeout = () => {
    console.log('timeout')
    setRun(runStates.INIT);
    setInWork((workState) => !workState);
    setIsModalShown(true);
  }

  const handleSettingButtonClick = () => {
    if (showSetting) {
      setShowSetting(false);
    }
    else {
      setShowSetting(true);
      setRun(runStates.INIT);
      resetTime(inWork, workTime, restTime);
    }
  }


  return (
    <SettingContext.Provider value={{ workTime, workTimeDispatch, restTime, restTimeDispatch }}>
      <div className="App">
        {
          showSetting
            ? <Setting />
            : <>
              <Timer run={run} time={remainTime} timeDispatch={remainTimeDispatch}
                onTimeout={handleTimeout} initTime={inWork ? workTime : restTime} />
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
              ? '返回主界面'
              : '设置时间'
          }
        </div>
        <Modal isShown={isModalShown} onComfirm={() => setIsModalShown(false)}
          message={inWork ? '休息时间结束' : '工作时间结束'} />
      </div>
    </SettingContext.Provider>
  );
}

export default App;
