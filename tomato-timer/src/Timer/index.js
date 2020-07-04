import React, { useEffect } from 'react';
import './style.css';
import * as runStates from '../constants'

const formatTime = (time) => {
    let minutes = Math.floor(time / 60).toString().padStart(2, 0);
    let seconds = (time % 60).toString().padStart(2, 0);

    return [minutes, seconds];
}

function Timer(props) {
    const { run, time, timeDispatch, initTime, onTimeout } = props;

    useEffect(() => {
        let interval;
        if (run === runStates.RUNNING) {
            interval = setInterval(() => {
                timeDispatch({ type: 'minusOne' });

            }, 1000);
        }
        return () => { clearInterval(interval) };
    }, [run, timeDispatch]);

    useEffect(() => {
        if (run === runStates.RUNNING && time <= 0) {
            onTimeout && onTimeout();
        }
    }, [run, time, onTimeout]);

    const [minutes, seconds] = formatTime(time);

    const progress = (1 - (time - 1) / (initTime * 60)) * 3.14 * 98;

    return (
        <div className="root">
            <svg className="timer-progress" viewBox='0 0 100 100'>
                <circle cx='50' cy='50' r='48' stroke='#ccc'
                    strokeWidth='2' fill='transparent' />
                <path className={`timer-stroke ${run === runStates.RUNNING && 'timer-stroke-running'}`}
                    d='M 50,50
                        m 0,-48 
                        a 48,48 0 1 0 0,96
                        a 48,48 0 1 0 0,-96'
                    strokeWidth='2' strokeLinecap='round'
                    fill='transparent'
                    stroke='red'
                    style={{ strokeDashoffset: progress }} />
            </svg>
            <div className="timer-view">
                <div className="time">{`${minutes}:${seconds}`}</div>
            </div>

        </div >
    );
}

export default Timer;