import React, { useState, useEffect } from 'react';
import './style.css';
import * as runStates from '../constants'

const formatTime = (time) => {
    let minutes = Math.floor(time / 60).toString().padStart(2, 0);
    let seconds = (time % 60).toString().padStart(2, 0);

    return [minutes, seconds];
}

function Timer(props) {
    const { run, initTime, onTimeout } = props;
    const [remainTime, setRemainTime] = useState(0);

    useEffect(() => {
        setRemainTime(initTime * 60);
    }, [initTime]);

    useEffect(() => {
        let interval;
        if (run === runStates.RUNNING) {
            interval = setInterval(() => {
                setRemainTime((r) => r - 1);

            }, 1000);
        }
        return () => { clearInterval(interval) };
    }, [run]);

    useEffect(() => {
        if (run === runStates.RUNNING && remainTime < 0) {
            onTimeout && onTimeout();
        }
    }, [run, remainTime, onTimeout]);

    const [minutes, seconds] = formatTime(remainTime);

    const progress = (1 - (remainTime - 1) / (initTime * 60)) * 3.14 * 98;

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
                    style={{ 'stroke-dashoffset': progress }} />
            </svg>
            <div className="timer-view">
                <div className="time">{`${minutes}:${seconds}`}</div>
            </div>

        </div >
    );
}

export default Timer;