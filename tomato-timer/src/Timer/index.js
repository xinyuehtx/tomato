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

    return (
        <div className="root">
            <div className="time">{`${minutes}:${seconds}`}</div>
        </div>
    );
}

export default Timer;